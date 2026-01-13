import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { JwtService } from '../jwt/jwt.service';

export interface IDecodedToken {
  userId?: string;
  [key: string]: unknown;
}

@Injectable()
export class RsaTokenService {
  private readonly logger = new Logger(RsaTokenService.name);
  private publicKey: string;

  constructor(private readonly jwtService: JwtService) {
    this.loadPublicKey();
  }

  /**
   * Загружает публичный ключ из файла keys/jwt_public.pem
   * Используется для RS256 верификации JWT токенов
   */
  private loadPublicKey(): void {
    try {
      const keyPath = path.join(process.cwd(), 'keys', 'jwt_public.pem');
      this.publicKey = fs.readFileSync(keyPath, 'utf-8');
      this.logger.log('✓ Public key loaded successfully');
    } catch (error) {
      this.logger.error(
        `Failed to load public key: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new Error('Public key not found');
    }
  }

  /**
   * Верифицирует JWT токен
   * Поддерживает RS256 (с публичным RSA ключом) и другие алгоритмы
   * @param token JWT токен
   * @returns Декодированные данные токена
   */
  async decryptToken(token: string): Promise<IDecodedToken> {
    try {
      const decoded = this.jwtService.decode(token) as IDecodedToken;

      if (!decoded) {
        throw new Error('Invalid token format');
      }

      if (!decoded.userId) {
        throw new Error('Invalid token: missing user identifier');
      }

      // TODO пока расшифровка через hsa256 потом нужно на rsa256
      await this.jwtService.verify(token);

      return decoded;
    } catch (error) {
      this.logger.error(
        `Failed to verify token: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new Error(`Invalid token: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Проверяет токен и возвращает данные пользователя
   * @param token Bearer токен или просто JWT токен
   * @returns Расшифрованные данные токена
   */
  async validateToken(token: string): Promise<IDecodedToken> {
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    return this.decryptToken(cleanToken);
  }
}

const SEPARATOR = '══════════════════════════════════════════════════════════════';

export function formatMicroserviceErrorForLogger(err: unknown, messagePattern: string): string {
  const lines: string[] = [
    '',
    SEPARATOR,
    '  MICROSERVICE ERROR',
    SEPARATOR,
    `  pattern: ${messagePattern}`,
  ];

  try {
    const rpc = err as {
      error?: {
        error?: {
          message?: string;
          name?: string;
          errorCode?: string;
          httpStatus?: number;
          metadata?: Record<string, unknown>;
        };
        message?: string;
      };
      message?: string;
    };
    const inner = (rpc?.error?.error ?? rpc?.error) as
      | {
          message?: string;
          name?: string;
          errorCode?: string;
          httpStatus?: number;
          metadata?: Record<string, unknown>;
        }
      | undefined;
    const message =
      inner?.message ?? rpc?.message ?? (err instanceof Error ? err.message : String(err));
    const name = inner?.name ?? (err instanceof Error ? err.name : 'Error');
    const errorCode = inner?.errorCode;
    const httpStatus = inner?.httpStatus;
    const metadata = inner?.metadata;

    lines.push(`  ${name}: ${message}`);
    if (errorCode != null) lines.push(`  errorCode: ${errorCode}`);
    if (httpStatus != null) lines.push(`  httpStatus: ${httpStatus}`);
    if (metadata != null && Object.keys(metadata).length > 0) {
      lines.push(`  metadata: ${JSON.stringify(metadata)}`);
    }
    if (err instanceof Error && err.stack) {
      lines.push('  ---');
      lines.push(
        err.stack
          .split('\n')
          .map((l) => '  ' + l)
          .join('\n'),
      );
    }
  } catch {
    lines.push(`  ${err instanceof Error ? err.message : String(err)}`);
    if (err instanceof Error && err.stack) lines.push('  ' + err.stack.replace(/\n/g, '\n  '));
  }

  lines.push(SEPARATOR, '');
  return lines.join('\n');
}

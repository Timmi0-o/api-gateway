// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      /* TypeScript Strict Rules */
      '@typescript-eslint/no-explicit-any': 'error', // Запрет any
      '@typescript-eslint/no-unsafe-member-access': 'off', // Запрет небезопасного доступа к членам
      '@typescript-eslint/no-unsafe-assignment': 'off', // Запрет небезопасного присваивания
      '@typescript-eslint/no-unsafe-call': 'off', // Запрет небезопасных вызовов
      '@typescript-eslint/no-unsafe-argument': 'error', // Запрет небезопасных аргументов
      '@typescript-eslint/no-unsafe-return': 'off', // Запрет небезопасных return
      '@typescript-eslint/no-floating-promises': 'error', // Обработка всех промисов
      '@typescript-eslint/require-await': 'error', // async функции должны содержать await
      '@typescript-eslint/await-thenable': 'error', // await только для thenable
      '@typescript-eslint/no-misused-promises': 'error', // Правильное использование промисов
      '@typescript-eslint/no-unnecessary-type-assertion': 'error', // Запрет ненужных type assertion
      '@typescript-eslint/strict-boolean-expressions': 'off', // Строгие boolean выражения
      '@typescript-eslint/no-non-null-assertion': 'error', // Запрет ! оператора

      '@typescript-eslint/explicit-module-boundary-types': 'error', // Явные типы для экспортов
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_*',
          varsIgnorePattern: '^_*',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
      ],

      /* Best Practices */
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Ограничение console
      'no-debugger': 'error', // Запрет debugger
      'no-var': 'error', // Запрет var
      'prefer-const': 'error', // Предпочтение const
      'prefer-arrow-callback': 'error', // Предпочтение arrow functions
      'no-duplicate-imports': 'error', // Запрет дублирования импортов
      'no-template-curly-in-string': 'error', // Предупреждение о ${} в строках
      'require-await': 'off', // Отключаем в пользу TS версии
      'no-return-await': 'off', // Отключаем в пользу TS версии
      '@typescript-eslint/return-await': 'error', // TS версия no-return-await

      /* Prettier */
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
        },
      ],
    },
  },
);

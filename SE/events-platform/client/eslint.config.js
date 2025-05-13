import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default js.defineConfig({
  root: true,
  ignores: ['dist'],
  files: ['**/*.{ts,tsx,js,jsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
      project: './tsconfig.json',
    },
    globals: { ...globals.browser, ...globals.node },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@typescript-eslint': tsPlugin,
  },
  settings: {
    react: { version: 'detect' },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    js.configs.recommended,
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',
  },
});

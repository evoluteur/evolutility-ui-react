import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/no-unescaped-entities': 'off',
      camelcase: 0,
    },
  },
  prettierConfig,
  {
    files: ['**/*.test.js', '**/*.test.jsx'],
    languageOptions: {
      globals: globals.vitest,
    },
  },
];

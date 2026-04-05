import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { configFile: './babel.config.cjs' }
      },
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2015,
        ...globals.jest,
        ...globals.node
      }
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-console': 0,
      'react/jsx-no-target-blank': 0,
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'complexity': ['error', { max: 3 }],
      'max-lines': ['error', { max: 100 }],
      'max-statements': ['error', { max: 5 }, { ignoreTopLevelFunctions: true }],
      'react/prop-types': 0
    }
  },
  {
    files: ['src/**/*.test.js'],
    rules: {
      'max-lines': ['error', { max: 1000 }],
      'max-statements': ['error', { max: 30 }, { ignoreTopLevelFunctions: true }]
    }
  }
];

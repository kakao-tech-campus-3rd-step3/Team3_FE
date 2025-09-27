const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'src/screens/mercenary/apply/mercenary_requet.tsx'],
  },
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@/src', './src'],
            ['@', './src'],
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
  },
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@/src', './src'],
            ['@', './src'],
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
  },
]);

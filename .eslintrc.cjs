module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@gravity-ui/eslint-config',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "camelcase": [
      "warn",
      {
        "ignoreDestructuring": true,
      }
    ],

    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
}

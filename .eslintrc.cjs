module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh',"simple-import-sort"],
  rules: {
    "simple-import-sort/imports": ["error",{
      "groups": [
        // Packages `react` related packages come first.
        ["^(react|next)", "^@?\\w"],
        // Internal packages.
        ["^(shared|entities|features|widgets|pages|app)(/.*|$)"],
        // Side effect imports.
        ["^\\u0000"],
        // Parent imports. Put `..` last.
        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
        // Other relative imports. Put same-folder imports and `.` last.
        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        // Style imports.
        ["^.+\\.?(css)$"]
      ]
    }],
    "simple-import-sort/exports": "error",
    'react-refresh/only-export-components': 'warn',
    'no-console': 'warn',
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        "allowSingleExtends": true
      }
    ]
  },
}

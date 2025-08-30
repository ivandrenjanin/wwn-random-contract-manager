module.exports = {
  root: true,
  extends: [
    '@eslint/js',
    'typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['build/**/*.ts'],
      parserOptions: {
        project: './tsconfig.build.json',
        tsconfigRootDir: __dirname,
      }
    }
  ]
};

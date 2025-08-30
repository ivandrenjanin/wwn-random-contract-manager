module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    extends: ["@eslint/js", "typescript-eslint"],
    overrides: [
        {
            files: ["src/**/*.{ts,tsx}", "tests/**/*.ts", "vite.config.ts"],
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            },
        }
    ],
};

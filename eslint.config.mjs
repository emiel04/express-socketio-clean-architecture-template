import * as tseslint from "typescript-eslint";
import * as eslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */

export default tseslint.config(
    {
        ignores: ["dist/**/*", "node_modules/**/*"],
        files: ["src/**/*.ts", "src/**/*.tsx", "test/**/*.ts", "test/**/*.tsx"],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    prettierConfig,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    }
);

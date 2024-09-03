// eslint.config.js
const { FlatCompat } = require("@eslint/eslintrc");
const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");

const compat = new FlatCompat();

module.exports = [
  {
    files: ["*.ts"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      semi: ["error", "always"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-case-declarations": "off",
    },
    ignores: ["node_modules/", "dist/"], // Ignorar directorios específicos
  },
];

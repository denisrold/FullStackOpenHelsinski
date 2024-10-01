// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
  ],
  plugins: ["react", "jest"],
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    jest: true,
  },
  babelOptions: {
    presets: ["@babel/preset-react"],
  },
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    node: true,
    amd: true,
  },
  extends: ["eslint:recommended"],
  // , "plugin:react/recommended"
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  // plugins: ["react"],
  rules: {
    "linebreak-style": 0,
    "no-global-assign": ["error", { exceptions: ["Object"] }],
    // enable additional rules
    indent: ["error", 4],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double", 2, "single"],
    semi: ["error", "always"],

    // override configuration set by extending "eslint:recommended"
    "no-empty": "warn",
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "for-direction": "off",
  },
};

module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    // override/add rules settings here, such as:
    'no-unused-vars': 'warn',
    'vue/require-default-prop': 'error',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      ts: '@typescript-eslint/parser',
      '<template>': 'espree',
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};

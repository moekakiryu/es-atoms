const mapRulesToTypescript = (rules, {
  allowTs = true,
  allowJs = true,
} = {}) => {
  const typescriptPrefix = '@typescript-eslint'
  const typescriptRules = {}

  Object.entries(rules).forEach(([rule, value]) => {
    typescriptRules[rule] = allowJs ? value : 'off'
    typescriptRules[`${typescriptPrefix}/${rule}`] = allowTs ? value : 'off'
  })

  return typescriptRules
}

const defaultRules = {
  semi: ['error', 'never'],

  'space-before-function-paren': ['error', {
    anonymous: 'never',
    named: 'never',
    asyncArrow: 'always',
  }],

  'strict-boolean-expressions': ['error', {
    allowString: false,
    allowNumber: false,
    allowNullableObject: true,
  }],

  'comma-dangle': ['error', {
    arrays: 'always-multiline',
    objects: 'always-multiline',
    imports: 'always-multiline',
    exports: 'always-multiline',
    functions: 'always-multiline',
  }],
}

const jsRules = {
  'explicit-function-return-type': 'off',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
  ],
  rules: {
    ...mapRulesToTypescript(defaultRules, { allowJs: false }),
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: [
        '*.jsx',
        '*.js',
      ],
      rules: {
        ...mapRulesToTypescript(jsRules),
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: [
    'node_modules/',
    'scripts/',
    'public/',
    'config/',
  ],
}

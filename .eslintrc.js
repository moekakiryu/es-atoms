const mapRulesToTypescript = (rules, {
  allowTs = true,
  allowJs = true,
} = {}) => {
  const typescriptPrefix = '@typescript-eslint'
  const typescriptRules = {}

  Object.entries(rules).forEach(([rule, value]) => {
    const isEslintOnly = Array.isArray(value) && (value[0] === 'eslint-only')
    const filteredValue = isEslintOnly ? value.slice(1) : value

    // If the rule only exists within one scope, always include that scope
    const includeEslintRule = allowJs || isEslintOnly
    const includeTsPrefix = allowTs && !isEslintOnly

    typescriptRules[rule] = includeEslintRule ? filteredValue : 'off'
    typescriptRules[`${typescriptPrefix}/${rule}`] = includeTsPrefix ? filteredValue : 'off'
  })

  return typescriptRules
}

const defaultRules = {
  'comma-dangle': ['error', {
    arrays: 'always-multiline',
    objects: 'always-multiline',
    imports: 'always-multiline',
    exports: 'always-multiline',
    functions: 'always-multiline',
  }],

  'jsx-quotes': ['eslint-only', 'error', 'prefer-double'],

  semi: ['error', 'never'],

  'space-before-function-paren': ['error', {
    anonymous: 'never',
    named: 'never',
    asyncArrow: 'always',
  }],

  // Only allow safe implicit null checks
  'strict-boolean-expressions': ['error', {
    allowString: false,
    allowNumber: false,
    allowNullableObject: true,
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

import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Backend gets its own lint config; graft/ and .playwright-mcp/ are local caches.
  globalIgnores(['dist', 'Backend', 'graft', '.playwright-mcp']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Count <motion.div> and <Icon /> as uses of `motion` / `Icon`.
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // shadcn/ui files export a variants helper next to the component
      // (e.g. buttonVariants). That only costs a full reload in dev, so warn.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])

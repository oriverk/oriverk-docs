module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:markdown/recommended'
	],
	overrides: [
		{
			files: ["**/*.{md,mdx}"],
			processor: "markdown/markdown"
    },
		{
			files: ["**/*.{md,mdx}/*.{js,ts,tsx,jsx,vue,svelte}"],
			rules: {
				"@typescript-eslint/no-unused-vars": 0
			}
		}
	],
	ignorePatterns: ["*.cjs"],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest'
	},
	plugins: [
		'@typescript-eslint',
		'markdown'
	],
	rules: {}
}

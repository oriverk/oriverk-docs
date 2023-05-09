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
			files: ["**/*.{md,mdx}/*.{javascript,js,typescrpit,ts,tsx,jsx,vue,svelte,astro}:?*"],
			rules: {
				"@typescript-eslint/no-unused-vars": 0,
				"@typescript-eslint/no-explicit-any": 0,
				"@typescript-eslint/no-var-requires": 0
			}
		},
		{
			files: ["**/*.{md,mdx}/*.{astro}:?.*"],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro']
			},
			rules: {},
		},
		{
			files: ["**/*.{md,mdx}/*.{svelte}:?.*"],
			processor: 'svelte3/svelte3',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.svelte']
			},
			rules: {},
			settings: {
				'svelte3/typescript': true
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
		'markdown',
		'svelte3'
	],
	rules: {}
}

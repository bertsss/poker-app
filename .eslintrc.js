module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'@vue/standard'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

		'no-tabs': 0,
		'indent': ['error', 'tab'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs']
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}

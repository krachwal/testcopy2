module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"no-unused-vars": [
			"warn",
			{ "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
		],
		"no-redeclare": ["warn"],
		"no-mixed-spaces-and-tabs": 0, // disable rule
		"key-spacing": ["error", { "afterColon": true }],
		"@stylistic/js/indent": ["error", "tab"],
	},
	"plugins": ["@stylistic/js"]
}

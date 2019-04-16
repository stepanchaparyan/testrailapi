module.exports = {
    'env': {
        'es6': true,
        'node': true,
        "mocha": true
    },
    'extends': ['eslint:recommended'],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 7, 
        'sourceType': 'module'
    },
    'plugins': [
        "mocha"
    ],
    'rules': {
        'no-magic-numbers': 0,
        "no-trailing-spaces": 1,
        'eqeqeq': 1,
        'no-alert': 1,
        'no-empty-function': 1,
        'no-console': 1,
        'default-case': 1,  
        'no-multi-spaces': 1,
        'no-param-reassign': 1,
        'no-unused-expressions': 1,
        'no-unsafe-finally': 1,
	    'no-duplicate-imports': 2,
        'no-dupe-keys': 2,
        'no-var': 2,
        'no-return-assign': 2,
        'no-useless-call': 2,
        'quotes': ['error', 'single'],
        'semi': 2,
    }
};
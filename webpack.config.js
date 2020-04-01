const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        count: './src/controllers/count.js',
        todos: './src/controllers/todos.js',
        mutations: './src/controllers/mutations.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].pack.js'
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader', 
                        options: { 
                            url: true 
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }
};
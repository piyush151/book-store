const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
   entry: {
        app: path.join(__dirname, './src/index.jsx'),
   },
   output: {
       filename: 'bundle/[name].[hash].bundle.js',
   },
   plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
        })
   ],
   module: {
        rules: [            
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/             
            }           
        ]
    }
};

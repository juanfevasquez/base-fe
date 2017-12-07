
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SassPlugin = require('sass-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.local\.jpe?g$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.jpe?g$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        /*
        new CopyWebpackPlugin([
            {
                from: 'src/markup/*.html',
                to: path.join(__dirname, 'dist'),
                flatten: true
            } 
        ])
        */
        new SassPlugin('./src/styles/main.scss', process.env.NODE_ENV),
        new HtmlWebpackPlugin({
            title: 'App Name',
            template: 'src/markup/index.html',
        }),
        new BrowserSyncPlugin(
            // BrowserSync options 
            {
                // browse to http://localhost:3000/ during development 
                host: 'localhost',
                port: 3000,
                server: { baseDir: ['dist'] }
            },
            // plugin options 
            {
                // prevent BrowserSync from reloading the page 
                // and let Webpack Dev Server take care of this 
                // reload: false
                open: false
            }
        )
    ]
};

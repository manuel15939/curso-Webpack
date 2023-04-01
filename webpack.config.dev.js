const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require ('dotenv-webpack');
module.exports = {
     // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: './src/index.js',
     // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output:{
        
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo

        path: path.resolve(__dirname, 'dist'),
        // filename le pone el nombre al archivo final
        filename:'[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve:{
         // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions:['.js'],
        alias: {
          '@utils': path.resolve(__dirname, 'src/utils/'),
          '@templates': path.resolve(__dirname, 'src/templates/'),
          '@styles': path.resolve(__dirname, 'src/styles/'),
          '@images': path.resolve(__dirname, 'src/assets/images/'),

        }
    },
    module: {
        rules: [
            {
                // nos permite inculir archivos con las extensiones .m ò .mjs
                test: /\.m?js$/ ,
                // nos permite excluir carpetas completas en este caso los modulos de node
                exclude: /node_modules/ ,
                use: { 
                    loader: 'babel-loader'
                }
            },
            {
                // nos permite inculir archivos con las extensiones .css y .styl
                test: /\.css|.styl$/i ,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader',
                ],
            },
            {
                test:/\.png/,
                type:'asset/resource',
                generator: {
                  filename: 'assets/images/[hash][ext][query]',
                },
            },
            {
              test: /\.(woff|woff2)$/,
              type:'asset/resource',
              generator: {
                filename: 'assets/fonts/[hash][ext][query]',
              },
            }
        ]
    },
    plugins: [ 
        new HtmlWebpackPlugin ({
            injet: true,
            template:"./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
}
/**
 * @fileoverview Configuration Webpack pour l'architecture Electron + React + JavaScript
 * @description Configuration build pour le renderer process avec React et Tailwind
 * @environment Build process avec support développement et production
 * @dependencies webpack, babel-loader, css-loader, postcss-loader, html-webpack-plugin
 * @customization Configuration optimisée pour Electron renderer
 * @validation Compatible avec JavaScript et Tailwind CSS
 * @related babel.config.js, tailwind.config.js, postcss.config.js
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;

  return {
    // Point d'entrée de l'application React
    entry: './src/index.jsx',
    
    // Configuration de sortie
    output: {
      path: path.resolve(__dirname, 'dist/renderer'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
      publicPath: './'
    },

    // Mode de build
    mode: isProduction ? 'production' : 'development',
    
    // Source maps pour debug
    devtool: isProduction ? false : 'eval-source-map',

    // Configuration du serveur de développement
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist/renderer'),
      },
      compress: true,
      port: 3000,
      hot: true,
      open: false, // N'ouvre pas le navigateur (on utilise Electron)
      headers: {
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
      }
    },

    // Résolution des modules
    resolve: {
      extensions: ['.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/features': path.resolve(__dirname, 'src/features'),
        '@/shared': path.resolve(__dirname, 'src/shared'),
        '@/electron': path.resolve(__dirname, 'src/electron')
      }
    },

    // Target pour Electron renderer
    target: 'electron-renderer',

    // Node polyfills pour Electron
    node: {
      __dirname: false,
      __filename: false
    },

    // Configuration des loaders
    module: {
      rules: [
        // JavaScript et React
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { node: 'current' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          ],
          exclude: /node_modules/
        },

        // CSS et Tailwind
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js')
                }
              }
            }
          ]
        },

        // Images et assets
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext][query]'
          }
        },

        // Polices
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext][query]'
          }
        }
      ]
    },

    // Plugins
    plugins: [
      // Fix pour les globals Electron
      new webpack.DefinePlugin({
        'global': 'globalThis',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      
      // Fix pour process et globals
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
      
      // Génération du fichier HTML
      new HtmlWebpackPlugin({
        template: './src/electron/renderer/index.html',
        filename: 'index.html',
        inject: 'body',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        } : false
      })
    ],

    // Optimisations
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
          }
        }
      },
      
      minimize: isProduction,
      
      // Cache pour améliorer les performances de build
      moduleIds: 'deterministic',
      runtimeChunk: 'single'
    },

    // Configuration du cache
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack')
    },

    // Statistiques de build
    stats: {
      errorDetails: true,
      children: false,
      modules: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false
    },

    // Externals - Exclure les modules Node.js du bundle
    externals: isProduction ? {} : {
      // En développement, certains modules peuvent être externalisés si nécessaire
    }
  };
};

/**
 * @fileoverview Configuration Webpack pour l'architecture Electron + React + TypeScript
 * @description Configuration build pour le renderer process avec React et Tailwind
 * @environment Build process avec support développement et production
 * @dependencies webpack, ts-loader, css-loader, postcss-loader, html-webpack-plugin
 * @customization Configuration optimisée pour Electron renderer
 * @validation Compatible avec TypeScript et Tailwind CSS
 * @related tsconfig.json, tailwind.config.js, postcss.config.js
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;

  return {
    // Point d'entrée de l'application React
    entry: './src/index.tsx',
    
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
    devtool: isProduction ? 'source-map' : 'eval-source-map',

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
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
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

    // Configuration des loaders
    module: {
      rules: [
        // TypeScript et React
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: isDevelopment, // Compilation plus rapide en dev
                configFile: path.resolve(__dirname, 'tsconfig.json')
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
      splitChunks: isProduction ? {
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
      } : false,
      
      minimize: isProduction,
      
      // Cache pour améliorer les performances de build
      moduleIds: 'deterministic',
      runtimeChunk: 'single'
    },

    // Configuration du cache
    cache: isDevelopment ? {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack')
    } : false,

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

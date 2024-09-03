const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = (
  /** @type { { MODE: 'dev' | 'prod' | undefined } } */env = {}
) => ( {
  mode: 'production',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.worker\.tsx?$/,
        use: [
          {
            loader: 'worker-loader',
            options: { inline: 'fallback' }
          }
          // { loader: 'ts-loader' }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { modules: 'global' }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.glsl/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    alias: {
      three: path.resolve( './node_modules/three' ),
      components: path.resolve( __dirname, 'src', 'components/' ),
      containers: path.resolve( __dirname, 'src', 'containers/' ),
      helpers: path.resolve( __dirname, 'src', 'helpers/' ),
      hooks: path.resolve( __dirname, 'src', 'hooks/' ),
      providers: path.resolve( __dirname, 'src', 'providers/' ),
      services: path.resolve( __dirname, 'src', 'services/' ),
      store: path.resolve( __dirname, 'src', 'store/' ),
      types: path.resolve( __dirname, 'src', 'types/' ),
      UI: path.resolve( __dirname, 'src/components/UI/' ),
      '3D': path.resolve( __dirname, 'src/components/3D/' )
    },
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.jsx'
    ]
  },
  target: 'web',
  output: {
    filename: './[name].[contenthash].js',
    path: path.resolve( __dirname, 'buildConfig' )
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin( {
        terserOptions: {
          keep_classnames: false,
          keep_fnames: false,
          output: { comments: false },
          compress: { drop_console: true }
        },
        extractComments: false,
        test: /\.js(\?.*)?$/i
      } )
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin( {
      patterns: [
        {
          from: 'public',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html']
          }
        }
      ]
    } ),
    new webpack.EnvironmentPlugin( { MODE: env.MODE } ),
    new webpack.ProvidePlugin( { process: 'process/browser' } ),
    new HtmlWebpackPlugin( {
      template: './public/index.html',
      minify: {
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
      }
    } )
  ]
} );

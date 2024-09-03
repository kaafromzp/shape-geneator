const webpack = require( 'webpack' );
const ReactRefreshWebpackPlugin = require( '@pmmmwh/react-refresh-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = (
  /** @type { { MODE: 'dev' | 'prod' | undefined } } */env = {}
) => ( {
  mode: 'development',
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
  devtool: 'eval-cheap-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve( __dirname, 'dist' )
  },
  plugins: [
    new webpack.EnvironmentPlugin( { MODE: env.MODE } ),
    new webpack.ProvidePlugin( { process: 'process/browser' } ),
    new HtmlWebpackPlugin( { template: './public/index.html' } ),
    new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    port: 3003,
    hot: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
} );

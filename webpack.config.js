/** @type {import('webpack').Configuration} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcssCustomPropertyObject = require('./dist/index.js');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

  entry: './example/src/index.ts',

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/example/dist`,
  },

  devtool: process.env.NODE_ENV === 'development' && 'inline-source-map',

  devServer: {
    hot: true,
    static: './example/dist',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssCustomPropertyObject({ token: '*', breakpoints: ['1000px', '750px'] })],
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },
};

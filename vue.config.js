const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // Enable Options API
        __VUE_PROD_DEVTOOLS__: false, // Disable devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false // Disable hydration mismatch details in production
      })
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/gym-leaderboard/'
    : '/'
});

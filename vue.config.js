/* eslint-disable no-param-reassign */
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/golden_ronny/' : '/',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Golden Ronny';
      return args;
    });
  },
};

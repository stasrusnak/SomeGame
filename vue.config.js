const path = require('path');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src") // change this to your folder path
      }
    }
  }
}


// module.exports = {
  // lintOnSave: false,
  // chainWebpack: config => {
  //   const inlineLimit = 10000;
  //   const assetsPath = 'src/assets';
  //   const stylesPath = 'src/styles';
  //
  //   config.module
  //     .rule('fonts')
  //     .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .options({
  //       limit: inlineLimit,
  //       name: path.join(assetsPath, 'fonts/[name].[hash:8].[ext]')
  //     });
  //   config.merge({ devtool: 'source-map' });
  //
  //   const oneOfsMap = config.module.rule('scss').oneOfs.store;
  //   oneOfsMap.forEach(item => {
  //     item
  //       .use('sass-resources-loader')
  //       .loader('sass-resources-loader')
  //       .options({
  //         resources: [path.join(stylesPath, 'shared.scss')]
  //       })
  //       .end();
  //   });
  //
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  // }
// };


var path = require('path');

module.exports = {
   // entry is the "main" source file we want to include/import
   entry: "./src/js/index.js",
   // output tells webpack where to put the bundle it creates
   output: {
      // in the case of a "plain global browser library", this
      // will be used as the reference to our module that is
      // hung off of the window object.
      library: "minui",
      // We want webpack to build a UMD wrapper for our module
      libraryTarget: "umd",
      // the destination file name
      filename: "build/js/minui.js"
   },
   // externals let you tell webpack about external dependencies
   // that shouldn't be resolved by webpack.
   externals: [
      {

      }
   ],
   module: {
      loaders: [
         // babel loader, testing for files that have a .js extension
         // (except for files in our node_modules folder!).
         {
            test: /\.js$/,
            exclude: path.join(__dirname, "minui/node_modules/"),
            loader: "babel-loader",
            query: {
               compact: false // because I want readable output
            }
         }
      ]
   }
};

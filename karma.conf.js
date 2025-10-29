// karma.conf.js

export default function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js'
    ],

    preprocessors: {
      'src/**/*.spec.js': ['babel'], 
       'src/contexts/*.jsx': ['babel'], // Asegura que los contextos se transpilen
       'src/hooks/*.js': ['babel']     
    },

    babelPreprocessor: {
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.jsx$/, '.js').replace(/\.js$/, '.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    
     browsers: ['Chrome'], 
    reporters: ['progress'],
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  });
};
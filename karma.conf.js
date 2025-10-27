// karma.conf.js

export default function(config) {
  config.set({
    // ... (frameworks, files, etc. como estaban) ...
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js'
    ],

    preprocessors: {
      // Aplica babel a TODOS los archivos .js y .jsx dentro de src
      // que coincidan con el patrón de archivos de prueba
      'src/**/*.spec.js': ['babel'], // Enfócate en los archivos de prueba
      // Puedes añadir otras carpetas si tus pruebas importan módulos no transpilados
       'src/contexts/*.jsx': ['babel'], // Asegura que los contextos se transpilen
       'src/hooks/*.js': ['babel']      // Asegura que los hooks se transpilen
    },

    babelPreprocessor: {
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        sourceMap: 'inline'
      },
      // El resto de babelPreprocessor como estaba...
      filename: function (file) {
        return file.originalPath.replace(/\.jsx$/, '.js').replace(/\.js$/, '.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    
    // ... (browsers, reporters, etc. como estaban) ...
     browsers: ['Chrome'], 
    reporters: ['progress'],
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  });
};
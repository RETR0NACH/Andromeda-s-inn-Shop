// babel.config.js (Versión ESM)

// Usamos 'export default' en lugar de 'module.exports'
export default {
  presets: [
    '@babel/preset-env', // Transforma sintaxis moderna de JS
    ['@babel/preset-react', { runtime: 'automatic' }] // Transforma JSX
  ]
};
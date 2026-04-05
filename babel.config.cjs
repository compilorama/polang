const babelPresetEnvBaseOptions = {
  targets: '> 0.5%, last 2 versions, not dead'
}

module.exports = {
  presets: [
    ['@babel/preset-env', babelPresetEnvBaseOptions],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  env: {
    cjs: {
      presets: [['@babel/preset-env', {
        ...babelPresetEnvBaseOptions,
        modules: 'commonjs'
      }]]
    },
    es6: {
      presets: [['@babel/preset-env', {
        ...babelPresetEnvBaseOptions,
        modules: false
      }]]
    }
  }
};

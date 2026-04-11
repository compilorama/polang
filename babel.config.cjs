const babelPresetEnvBaseOptions = {
  targets: '> 0.5%, last 2 versions, not dead'
};

const baseEnvPlugins = [
  ['module-resolver', { alias: { '@src': './src' } }]
];

module.exports = {
  presets: [
    ['@babel/preset-env', babelPresetEnvBaseOptions],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  env: {
    cjs: {
      plugins: [...baseEnvPlugins],
      presets: [['@babel/preset-env', {
        ...babelPresetEnvBaseOptions,
        modules: 'commonjs'
      }]]
    },
    es6: {
      plugins: [...baseEnvPlugins],
      presets: [['@babel/preset-env', {
        ...babelPresetEnvBaseOptions,
        modules: false
      }]]
    }
  }
};

const path = require('path');
const rewireSass = require('react-app-rewire-scss');
const { getLoader } = require('react-app-rewired');

module.exports = function override(config, env) {
  config = rewireSass(config, env);
  const cssLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('css-loader'),
  );
  cssLoader.options = {
    ...cssLoader.options,
    minimize: false,
  };
  config.resolve = {
    alias: {
      Views: path.resolve(__dirname, './src/views/'),
      Actions: path.resolve(__dirname, './src/actions/'),
      Reducers: path.resolve(__dirname, './src/reducers/'),
      Components: path.resolve(__dirname, './src/components/'),
      Containers: path.resolve(__dirname, './src/containers/'),
    },
  };
  return config;
};

import type { Configuration } from 'webpack';

import { plugins } from './webpack.plugins';
import { rules } from './webpack.rules';

const computedRules = rules(true);
computedRules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules: computedRules,
  },
  plugins,
  resolve: {
    modules: ["src", "node_modules", "src/main", "src/common"],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};

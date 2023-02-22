import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new CopyPlugin({
    patterns: [
      { from: "public/*.sf2", to: "[name][ext]" },
      { from: "public/*.svg", to: "[name][ext]" },
      { from: "public/*.png", to: "[name][ext]" },
    ],
  }),
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
];

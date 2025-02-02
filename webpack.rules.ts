import type { ModuleOptions } from 'webpack';

export function rules(isRender = false): Required<ModuleOptions>['rules'] {
  const tsconfigFile = isRender ? `src/tsconfig.json` : 'srcMain/tsconfig.json';

  return [
    // Add support for native node modules
    {
      // We're specifying native_modules in the test because the asset relocator loader generates a
      // "fake" .node file which is really a cjs file.
      test: /native_modules[/\\].+\.node$/,
      use: 'node-loader',
    },
    {
      test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
      parser: { amd: false },
      use: {
        loader: '@vercel/webpack-asset-relocator-loader',
        options: {
          outputAssetBase: 'native_modules',
        },
      },
    },
    {
      test: /\.tsx?$/,
      exclude: /(node_modules|\.webpack)/,
      use: {
        loader: 'ts-loader',
        options: {
          configFile: tsconfigFile,
          transpileOnly: true,
        },
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
      loader: "url-loader",
    },
    {
      test: /\.svg$/,
      loader: "react-svg-loader",
    },
  ];
}
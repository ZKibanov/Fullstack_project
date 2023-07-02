import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

  const typescriptLoader = {
    // для файлов ts | tsx
    // если есть jsx - то нужен babel\babel-loader
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.(sc|sa|c)ss$/i,
    use: [
      // Creates `style` nodes from JS strings in prod
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          // поддержка css-modules
          modules: {
          // разделение, в каких файлах поддерживать модули, в каких - нет
          auto: (resPath: string) => Boolean(resPath.includes('.module.scss')),
          localIdentName: isDev 
          ? '[path][name]__[local]' 
          : '[hash:base64:8]'
          }
        }
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }

  return [
    typescriptLoader,
    cssLoader
  ]
}
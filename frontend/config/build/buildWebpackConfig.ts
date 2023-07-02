import { BuildOptions } from "./types/config";
import path from 'path';
import webpack from 'webpack';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from "./buildDevServer";

/** Функция сборки всего конфига для webpack
*  перед отправкой в webpack.config.js
*/

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;
  return {
    mode: mode,
    entry: paths.entry,
    output: {
      // алиас, к имени файла добавляем хэш
      filename: '[name].[contenthash].js',
      // path.resolve для мультисистемности (win/lin)
      path: paths.build,
      // очистка папки перед сборкой
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      // правила для модулей
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined
  }
}
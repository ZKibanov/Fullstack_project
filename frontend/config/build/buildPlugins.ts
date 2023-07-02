import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins ({paths}: BuildOptions):webpack.WebpackPluginInstance[] {
    return [
        // показывает прогресс при сборке
        new webpack.ProgressPlugin(),
        // подключает скрипты в html
        new HtmlWebpackPlugin({
          //берет шаблон из индекс.хтмл, иначе создает свой
          template: paths.html
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css'
        })
      ]
}
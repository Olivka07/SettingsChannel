import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { WebpackConfigOptions } from './types/config'

export function buildLoaders({isDev}: WebpackConfigOptions):webpack.RuleSetRule[] {
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader': MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader:"css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')), // свойство, которое отвечает
                                                                                        // за то, какие файлы будут участвовать
                                                                                        //в модульной системе
                        localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:8]",//название классов
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
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { WebpackConfigOptions } from "./types/config";
import webpack from 'webpack'

export function buildWebpackConfig(options: WebpackConfigOptions): webpack.Configuration {

    const {mode, paths, isDev} = options
    return {
        mode: mode,
        entry: {
            main: paths.entry
        },
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(),
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true
        },
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map':undefined,
        devServer: isDev ? buildDevServer(options): undefined
    }
}
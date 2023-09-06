import { WebpackConfigOptions } from "./types/config";
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'

export function buildDevServer(options: WebpackConfigOptions): DevServerConfiguration{
    return {
        port: options.port,
        open: true
    }
}
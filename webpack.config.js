const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const htmlPlugin = require("html-webpack-plugin");
const loadPresets = env => require("./assets/build_utils/loadPresets")(env);
const loadConfigs = env =>
    require(`./assets/build_utils/webpack.${env.mode}`)(env);

const SRC_DIR = path.resolve("./src");
const PUBLIC_PATH = "/static/app";

const config = ({ mode, presets } = { mode: "production", presets: "react" }) =>
    webpackMerge(
        {
            mode,
            entry: path.join(SRC_DIR, "index.js"),
            module: {
                rules: [
                    {
                        test: /\.(png|jpg|gif)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {}
                            }
                        ]
                    }
                ]
            },
            plugins: [
                new htmlPlugin({ template: path.join(SRC_DIR, "index.html") })
            ]
        },
        loadPresets({ mode, presets }),
        loadConfigs({ mode, presets })
    );

module.exports = config;

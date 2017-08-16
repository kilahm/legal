const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = process.env['NODE_ENV'] === 'production';

const cssLoaderConf = {
    loader: 'css-loader',
    options: {
        minimize: true,
        sourceMap: isProduction,
    }
};
const cssConf = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [cssLoaderConf, 'typed-css-modules-loader']
});


const config = {
    entry: "./front/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/public"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssConf
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
            }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: [
        new ExtractTextPlugin("styles.css"),
    ],
};

if (!isProduction) {
    config.module.rules.push({
        enforce: "pre",
        test: /\.js$/,
        use: [
            "source-map-loader"
        ]
    });
    config.devtool = "source-map";
}
module.exports = config;

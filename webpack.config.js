const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssLoaderConf = {
    loader: 'css-loader',
    options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
    }
};
const cssConf = process.env.NODE_ENV === 'production'
    ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [cssLoaderConf]
    })
    : ['style-loader', 'typed-css-modules-loader', cssLoaderConf];


module.exports = {
    entry: "./front/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/public"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

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
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            {
                enforce: "pre",
                test: /\.js$/,
                use: [
                    "source-map-loader"
                ]
            },
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

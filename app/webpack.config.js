module.exports = {
    entry: {
        "index": "./source/scripts/index.js",
        "dojo": "./source/scripts/dojo.js",
        "logic-puzzle": "./source/scripts/logic-puzzle.js",
        "register": "./source/scripts/register.js"
    },
    output: {
        path: __dirname + '/public/scripts/',
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            //{ test: /\.css$/, loader: "style!css" },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]

    }
};
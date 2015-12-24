module.exports = {
    entry: {
        "index": "./source/scripts/index.js",
        "logic-puzzle": "./source/scripts/logic-puzzle",
        "dojo": "./source/scripts/dojo.js",
        "register": "./source/scripts/register.js"
    },
    output: {
        path: __dirname + '/public',
        filename: 'scripts/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    devtool: '#inline-source-map'
};
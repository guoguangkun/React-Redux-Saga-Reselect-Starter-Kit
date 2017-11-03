const express = require('express');
const path = require('path');
const webpack = require('webpack');
const logger = require('../build/lib/logger');
const webpackConfig = require('../build/webpack.config');
const project = require('../config/project.config');
const compress = require('compression');
const historyApiFallback = require('connect-history-api-fallback');
const browserSync = require('browser-sync');
const proxyMiddleware = require('http-proxy-middleware');

const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackHotMiddleware = require('webpack-hot-middleware');

const proxyTable = {
    '/iplookup': {
        target: 'http://int.dpool.sina.com.cn',
        changeOrigin: true,
        pathRewrite: {
            '^/iplookup': '/iplookup',
        },
    },
};

const app = express();
app.use(compress());

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------

let proxy = '';
Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options };
    }
    proxy = proxyMiddleware(options.filter || context, options);
    // app.use(proxyMiddleware(options.filter || context, options))
});

if (project.env === 'development') {
    const compiler = webpack(webpackConfig);
    logger.info('Enabling webpack development and HMR middleware');
    browserSync({
        port: 3013,
        ui: {
            port: 3014,
        },
        server: {
            baseDir: 'src',
            middleware: [
                proxy,
                historyApiFallback(),
                webpackDevMiddleware(compiler, {
                    // Dev middleware can't access config, so we provide publicPath
                    publicPath: webpackConfig.output.publicPath,

                    // These settings suppress noisy webpack
                    // output so only errors are displayed to the console.
                    noInfo: true,
                    quiet: false,
                    stats: {
                        assets: false,
                        colors: true,
                        version: false,
                        hash: false,
                        timings: false,
                        chunks: false,
                        chunkModules: false,
                    },

                    // for other settings see
                    // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
                }),
                // bundler should be the same as above
                webpackHotMiddleware(compiler),
            ],
        },
        // no need to watch '*.js' here, webpack will take care of it for us,
        // including full page reloads if HMR won't work
        files: [
            'src/*.html',
        ],
    });
    // app.use(require('webpack-dev-middleware')(compiler, {
    //   publicPath  : webpackConfig.output.publicPath,
    //   contentBase : path.resolve(project.basePath, project.srcDir),
    //   hot         : true,
    //   quiet       : false,
    //   noInfo      : false,
    //   lazy        : false,
    //   stats       : 'normal',
    // }))
    // app.use(require('webpack-hot-middleware')(compiler, {
    //   path: '/__webpack_hmr'
    // }))

    // Serve static assets from ~/public since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
    app.use(express.static(path.resolve(project.basePath, 'public')));

    // This rewrites all routes requests to the root /index.html file
    // (ignoring file requests). If you want to implement universal
    // rendering, you'll want to remove this middleware.
    app.use('*', (req, res, next) => {
        const filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
} else {
    logger.warn('Server is being run outside of live development mode, meaning it will ' +
        'only serve the compiled application bundle in ~/dist. Generally you ' +
        'do not need an application server for this and can instead use a web ' +
        'server such as nginx to serve your static files. See the "deployment" ' +
        'section in the README for more information on deployment strategies.');

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use(express.static(path.resolve(project.basePath, project.outDir)));
}

module.exports = app;

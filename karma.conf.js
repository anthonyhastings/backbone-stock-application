'use strict';

// Loading dependencies.
var webpackConfig = require('./webpack.config.js');

// Ensure that any entry bundles pre-defined in the config are forgotten about.
webpackConfig.entry = {};

module.exports = function(config) {
    config.set({
        client: {
            mocha: {
                timeout: 8000
            }
        },

        frameworks: [
            'mocha',
            'chai',
            'sinon'
        ],

        files: [
            'src/scripts/**/*.spec.js'
        ],

        preprocessors: {
            'src/scripts/**/*.spec.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            watchOptions: {
                aggregateTimeout: 10000
            }
        },

        reporters: [
            'progress'
        ],

        browsers: ['PhantomJS'],

        port: 9876,

        autoWatch: false,

        singleRun: true,

        logLevel: config.LOG_INFO
    });
};
module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            { pattern: "src/js/validacionesCore.js", included: true, watched: true },
            { pattern: "test/**/*.spec.js", included: true, watched: true }
        ],
        reporters: ["progress"],
        browsers: ['FirefoxHeadless'],
        browsers: ['ChromeHeadless'],
        singleRun: true,
        autoWatch: false
    });
};
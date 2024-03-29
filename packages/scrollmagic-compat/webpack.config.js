const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "animation.gsap": "scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js",
        "debug.addIndicators": 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
        "ScrollMagic": "scrollmagic/scrollmagic/minified/ScrollMagic.min.js"
    }, 
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "lib"),
        library: "[name]",
        libraryTarget: "window"
    },
    mode: "production",
    resolve: {
        modules: [
            path.resolve(__dirname, "../")
        ]
    },
    externals: {
        ScrollMagic: "ScrollMagic",
        "TweenLite": "TweenLite",
        "TimelineLite": "TimelineLite",
        "TweenMax": "TweenMax",
        "TimelineMax": "TimelineMax",
    }
}
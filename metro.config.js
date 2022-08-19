module.exports = {
    transformer: {
        minifierPath: 'metro-minify-terser',
        minifierConfig: {
            // https://www.npmjs.com/package/terser#mangle-options
            ecma: 8,
            keep_classnames: true,
            keep_fnames: true,
            module: true,
            mangle: {
                module: true,
                keep_classnames: true,
                keep_fnames: true,
            }
        },
    }
};

// https://github.com/facebook/metro/issues/154#issuecomment-476145653
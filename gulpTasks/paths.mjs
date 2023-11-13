const paths = {

    minifyImg: {
        src: "./src/assets/images/*",
        dest: "./dist/assets/images",
    },

    html: {
        src: "./src/**/*.html",
        dest: "./dist",
    },

    css: {
        src: [
            "./src/scss/**/*.scss",
            "!./src/scss/vendor/**"
        ],
        dest: "./dist/css",
    },

    js: {
        src: "./src/js/**/*.js",
        dest: "./dist/js",
    },

    publicDir: [
        {
            dir: "./src/assets/fonts/",
            src: "./src/assets/fonts/",
            dest: "./dist/assets/fonts",
        }
    ],

    vendors: [
        {
            dir: "./node_modules/normalize.css",
            src: "./node_modules/normalize.css",
            dest: "./src/scss/vendor/normalize",
        }
    ]

}
export default paths;
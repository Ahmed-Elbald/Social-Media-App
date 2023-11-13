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
            "./src/assets/scss/**/*.scss",
            "!./src/assets/scss/vendor/**"
        ],
        dest: "./dist/assets/css",
    },

    js: {
        src: "./src/assets/js/**/*.js",
        dest: "./dist/assets/js",
    },

    public: [
        {
            src: "./src/assets/fonts",
            dest: "./dist/assets/fonts",
        }
    ],

    vendors: [
        {
            dir: "./node_modules/normalize.css",
            src: "./node_modules/normalize.css",
            dest: "./src/assets/scss/vendor/normalize",
        }
    ]

}
export default paths;
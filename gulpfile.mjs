// Imports
import gulp from "gulp";
import paths from "./gulpTasks/paths.mjs";
import copyPublic from "./gulpTasks/copyPublic.mjs"
import copyVendors from "./gulpTasks/copyVendors.mjs"
import minifyImgs from "./gulpTasks/minifyImgs.mjs";
import buildHTML from "./gulpTasks/buildHTML.mjs";
import cssify from "./gulpTasks/cssify.mjs";
import uglify from "./gulpTasks/uglify.mjs";
import serve from "./gulpTasks/serve.mjs";

// Variables
const { watch, series } = gulp;
const watchOptions = {
    delay: 0,
    ignoreInitial: false,
}

function start(cb) {

    copyPublic();
    copyVendors();
    minifyImgs();
    cb();

}

function watchFiles(cb) {

    watch(
        paths.html.src,
        watchOptions,
        buildHTML
    );

    watch(
        paths.css.src,
        watchOptions,
        cssify
    );

    watch(
        paths.js.src,
        watchOptions,
        uglify
    );

    cb();

}


export default series(serve, watchFiles);
export { start, uglify }
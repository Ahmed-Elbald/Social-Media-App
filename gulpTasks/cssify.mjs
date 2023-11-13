// Imports
import gulp from "gulp";
import paths from "./paths.mjs"
import connect from "gulp-connect";
import gulpSass from "gulp-sass";
import * as dartSass from "sass"
import autoPrefixer from "gulp-autoprefixer";
import gulpRename from "gulp-rename"

// Variables
const { src, dest } = gulp;
const sass = gulpSass(dartSass);

// Functions
export default function cssify() {

    return src(paths.css.src)
        .pipe(sass.sync({
            outputStyle: "compressed"
        })
            .on("error", sass.logError))
        .pipe(autoPrefixer())
        .pipe(gulpRename(function (path) {
            path.exname = ".min.css"
        }))
        .pipe(dest(paths.css.dest))
        .pipe(connect.reload());

}
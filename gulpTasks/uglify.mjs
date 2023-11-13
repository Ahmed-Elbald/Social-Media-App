// Imports
import gulp from "gulp";
import paths from "./paths.mjs"
import connect from "gulp-connect";
import terser from "gulp-terser"

// Variables
const { src, dest } = gulp;

// Functions
export default function uglify() {

    return src(paths.js.src)
        .pipe(terser({
            ecma: 2016
        }))
        .pipe(dest(paths.js.dest))
        .pipe(connect.reload());

}
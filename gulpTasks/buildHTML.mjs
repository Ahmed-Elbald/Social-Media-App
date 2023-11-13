// Imports
import gulp from "gulp";
import paths from "./paths.mjs"
import connect from "gulp-connect";
import fileInclude from "gulp-file-include";
import htmlMinify from "gulp-html-minifier";

// Variables
const { src, dest } = gulp;

// Functions
export default function buildHTML() {

    return src("./src/*.html")
        .pipe(fileInclude())
        .pipe(htmlMinify({ collapseWhitespace: true }))
        .pipe(dest(paths.html.dest))
        .pipe(connect.reload());

}
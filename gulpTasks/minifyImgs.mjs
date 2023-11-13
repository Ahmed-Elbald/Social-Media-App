// Imports
import gulp from "gulp";
import paths from "./paths.mjs"
import minifyImg from "gulp-imagemin"

// Variables
const { src, dest } = gulp;

// Functions
export default function minifyImgs() {

    return src(paths.minifyImg.src)
        .pipe(minifyImg())
        .pipe(dest(paths.minifyImg.dest));

}
// Imports
import connect from "gulp-connect";

export default function serve(cb) {

    connect.server({
        root: "./dist",
        livereload: true,
    });

    cb()

}
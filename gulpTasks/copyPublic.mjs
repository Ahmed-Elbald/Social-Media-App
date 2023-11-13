// Imports
import paths from "./paths.mjs"
import fs from "fs"

// Variables
const { cpSync } = fs;

// Functions
export default function copyPublic() {

    for (let publicDir of paths.public) {

        if (existsSync(publicDir.dir)) {
            cpSync(
                publicDir.src,
                publicDir.dest,
                { recursive: true }
            )
        }

    }

    cpSync(
        paths.public.src,
        paths.public.dest,
        { recursive: true }
    );

}
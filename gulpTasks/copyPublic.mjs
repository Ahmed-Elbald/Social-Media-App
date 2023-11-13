// Imports
import paths from "./paths.mjs"
import fs from "fs"

// Variables
const { existsSync, cpSync } = fs;

// Functions
export default function copyPublic() {

    for (let publicDir of paths.publicDir) {

        if (existsSync(publicDir.dir)) {
            cpSync(
                publicDir.src,
                publicDir.dest,
                { recursive: true }
            )
        }

    }

}
// Imports
import paths from "./paths.mjs"
import fs from "fs"

// Variables
const { existsSync, cpSync } = fs;

// Functions
export default function copyVendors() {

    for (let vendor of paths.vendors) {

        if (existsSync(vendor.dir)) {
            cpSync(
                vendor.src,
                vendor.dest,
                { recursive: true }
            )
        }

    }

}
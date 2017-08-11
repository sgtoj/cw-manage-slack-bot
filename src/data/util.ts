import * as fs from "fs";


function isObject(value) {
    // check if type is object
    if (typeof value !== "object")
        return false;

    // check for input value has any non-inherent object propertes
    for (let key in value) {
        if (value.hasOwnProperty(key))
            return true;
    }

    // default to false
    return false;
}

export function merge(defaults, config) {
    // iterate through all config values
    for (let key in config) {
        // ensure value is not inherent from base object
        if (!config.hasOwnProperty(key))
            continue;

        // recurse and override the defaults
        if (defaults[key] && isObject(defaults[key]) && isObject(config[key])) {
            merge(defaults[key], config[key]);
        } else {
            defaults[key] = config[key];
        }
    }

    return defaults;
}

export function load(path: string) {
    let config;

    if (fs.existsSync(path)) {
        try {
            let contents = fs.readFileSync(path, "utf8");
            config = JSON.parse(contents);
        } catch (e) {
            console.error(e);
        }
    }

    return config || {};
}
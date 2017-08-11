import * as fs from "fs";

import { AppConfig } from "../app";
import { merge } from "./util";

function generate(envs?: NodeJS.ProcessEnv): AppConfig {
    envs = envs || {};

    let config: AppConfig = {
        "server": {
            "port": envs["SERVER_PORT"] || 80,
            "basePath": envs["SERVER_BASEPATH"] || ""
        },
        "slack": {
            "authToken": envs["SLACK_AUTHTOKEN"] || "",
            "botAuthToken": envs["SLACK_BOTAUTHTOKEN"] || "",
            "validationToken": envs["SLACK_VALIDATIONTOKEN"] || "",
            "handlerConfig": {
                "messageConfig": {
                    "footerIcon": "http://i.imgur.com/0Ndqgz3.png"
                }
            }
        },
        "team": {
            "teamId": "main",
            "cwmanage": {
                "companyId": envs["CWMANAGE_COMPANYID"] || "",
                "companyUrl": envs["CWMANAGE_COMPANYURL"] || "api-na.myconnectwise.net",
                "publicKey": envs["CWMANAGE_PUBLICKEY"] || "",
                "privateKey": envs["CWMANAGE_PRIVATEKEY"] || "",
                "timeout": 5000
            }
        }
    };

    return Object.assign({}, config);
}

// default values
export const defaults = generate();

// config values defined by envs
export const envs = generate(process.env);
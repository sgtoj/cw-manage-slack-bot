import * as fs from "fs";
import defaults from "./data/defaults";
import { App, AppConfig } from "./app";

const CONFIG_PATH = process.env.CONFIG_PATH || "./appconfig.json";

let config: AppConfig  = Object.assign({}, defaults.config);

if (fs.existsSync(CONFIG_PATH)) {
    try {
        let contents = fs.readFileSync(CONFIG_PATH, "utf8");
        let override = JSON.parse(contents);
        config = Object.assign(defaults, override);
    } catch (e) {
        console.error(e);
    }
}

config.app.port = process.env.APP_PORT || config.app.port;
config.slack.token = process.env.SLACK_TOKEN || config.slack.token;
config.cwmanage.companyId = process.env.CWMANAGE_COMPANYID || config.cwmanage.companyId;
config.cwmanage.companyUrl = process.env.CWMANAGE_COMPANYURL || config.cwmanage.companyUrl;
config.cwmanage.publicKey = process.env.CWMANAGE_PUBLICKEY || config.cwmanage.publicKey;
config.cwmanage.privateKey = process.env.CWMANAGE_PRIVATEKEY || config.cwmanage.privateKey;

const app = new App();
app.configure(config);
app.launch();

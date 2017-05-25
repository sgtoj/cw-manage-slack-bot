import * as fs from "fs";
import defaults from "./data/defaults";
import { TeamStore } from "./teams/store";
import { SlackApp, AppConfig } from "./app";

const CONFIG_PATH = process.env.CONFIG_PATH || "./appconfig.json";

let config: AppConfig = Object.assign({}, defaults.config);

if (fs.existsSync(CONFIG_PATH)) {
    try {
        let contents = fs.readFileSync(CONFIG_PATH, "utf8");
        let override = JSON.parse(contents);
        config = Object.assign(defaults, override);
    } catch (e) {
        console.error(e);
    }
}

config.team.cwmanage.companyId = process.env.CWMANAGE_COMPANYID || config.team.cwmanage.companyId;
config.team.cwmanage.companyUrl = process.env.CWMANAGE_COMPANYURL || config.team.cwmanage.companyUrl;
config.team.cwmanage.publicKey = process.env.CWMANAGE_PUBLICKEY || config.team.cwmanage.publicKey;
config.team.cwmanage.privateKey = process.env.CWMANAGE_PRIVATEKEY || config.team.cwmanage.privateKey;

const teams = new TeamStore();
teams.add(config.team);

config.slack.authToken = process.env.SLACK_AUTHTOKEN || config.slack.authToken;
config.slack.validationToken = process.env.SLACK_VALIDATIONTOKEN || config.slack.validationToken;
config.server.port = process.env.SERVER_PORT || config.server.port;
config.server.basePath = process.env.SERVER_BASEPATH || config.server.basePath;

const app = new SlackApp(config, teams);
app.launch();

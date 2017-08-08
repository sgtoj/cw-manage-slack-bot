import * as fs from "fs";
import defaults from "./data/defaults";
import { TeamStore } from "./teams/store";
import { SlackApp, AppConfig } from "./app";

const CONFIG_PATH = process.env.CONFIG_PATH || "./appconfig.json";

let config: AppConfig = Object.assign({}, defaults.config);

// import the settings from appconfig.json if it exists
if (fs.existsSync(CONFIG_PATH)) {
    try {
        let contents = fs.readFileSync(CONFIG_PATH, "utf8");
        let override = JSON.parse(contents);
        config = Object.assign(defaults, override);
    } catch (e) {
        console.error(e);
    }
}

// build the CW Manage configuration
config.team.cwmanage.companyId = process.env.CWMANAGE_COMPANYID || config.team.cwmanage.companyId;
config.team.cwmanage.companyUrl = process.env.CWMANAGE_COMPANYURL || config.team.cwmanage.companyUrl;
config.team.cwmanage.publicKey = process.env.CWMANAGE_PUBLICKEY || config.team.cwmanage.publicKey;
config.team.cwmanage.privateKey = process.env.CWMANAGE_PRIVATEKEY || config.team.cwmanage.privateKey;

// create Slack Team interface
const teams = new TeamStore();
teams.add(config.team);

// build the Slack team and bot configuration
config.slack.authToken = process.env.SLACK_AUTHTOKEN || config.slack.authToken;
config.slack.botAuthToken = process.env.SLACK_BOTAUTHTOKEN || config.slack.botAuthToken;
config.slack.validationToken = process.env.SLACK_VALIDATIONTOKEN || config.slack.validationToken;
config.server.port = process.env.SERVER_PORT || config.server.port;
config.server.basePath = process.env.SERVER_BASEPATH || config.server.basePath;

// launch the bot
const app = new SlackApp(config, teams);
app.launch();

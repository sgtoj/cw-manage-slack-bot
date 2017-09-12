import * as fs from "fs";
import * as config from "./data/config";
import { load, merge } from "./data/util";
import { TeamStore } from "./teams/store";
import { SlackApp, AppConfig } from "./app";
import { TeamModel } from "./teams/interfaces";
import { SlackEventMetaData } from "./slack/interfaces";
import { enableLogging } from "./logging";

const CONFIG_PATH = process.env.CONFIG_PATH || "./appconfig.json";

let coreConfig: AppConfig = Object.assign({}, config.core);
let teamConfig: TeamModel = Object.assign({}, config.team);

// import the settings from appconfig.json if it exists
if (fs.existsSync(CONFIG_PATH)) {
    let userConfig = load(CONFIG_PATH);
    coreConfig = merge(coreConfig, userConfig.core);
    teamConfig = merge(teamConfig, userConfig.team);
}

// create Slack Team interface
const teams = new TeamStore();
teams.add(teamConfig);

// launch the bot
const app = new SlackApp(coreConfig, teams);

enableLogging(app);
app.launch();

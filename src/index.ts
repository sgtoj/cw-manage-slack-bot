import * as fs from "fs";
import { defaults, envs } from "./data/config";
import { merge, load }  from "./data/util";
import { TeamStore } from "./teams/store";
import { SlackApp, AppConfig } from "./app";
import { enableLogging } from "./logging";

let config: AppConfig = Object.assign({}, defaults);

// import the settings from appconfig.json if it exists
let userConfig = load(process.env.CONFIG_PATH || "./appconfig.json");
config = merge(config, userConfig);

// import the settings from envs
config = merge(config, envs);

// create Slack team interface
const teams = new TeamStore();
teams.add(config.team);

// launch the Slack bot
const app = new SlackApp(config, teams);
enableLogging(app);
app.launch();

import * as http from "http";
import * as express from "express";
import { EventEmitter } from "events";

import { HandlerAPI, HandlerAPIConfig } from "./server/server";
import { CWManageConfig } from "./cwmanage/client";
import { SlackBot, SlackBotConfig } from "./bot/bot";
import { SlackEvent } from "./slack/interfaces";
import { TeamStore } from "./teams/store";

export interface AppConfig {
    server: HandlerAPIConfig;
    slack: SlackBotConfig;
}

export class SlackApp extends EventEmitter {
    private readonly config: AppConfig;
    private readonly bot: SlackBot;
    private readonly api: HandlerAPI;
    private readonly server: http.Server;
    private readonly teams: TeamStore;



    constructor(config: AppConfig, teams: TeamStore) {
        super();
        this.config = config;

        this.teams = teams;
        this.bot = new SlackBot(this.config.slack, this.teams);
        this.api = new HandlerAPI(config.server, this.bot);
        this.server = http.createServer(this.api.interface);
        this.registerEventListeners();
    }

    public launch() {
        this.server.listen(this.config.server.port);
    }

    public registerEventListeners() {
        this.bot.on("unknownTeamId", this.onEvent("unknownTeamId"));
        this.bot.on("noBotHandler", this.onEvent("noBotHandler"));
        this.bot.on("invalidBotToken", this.onEvent("invalidBotToken"));
        this.bot.on("issueNotFound", this.onEvent("issueNotFound"));
        this.bot.on("eventHandled", this.onEvent("eventHandled"));
        this.bot.on("error", this.onEvent("error"));

        this.api.on("get", this.onEvent("getRequest"));
        this.api.on("post", this.onEvent("postRequest"));
        this.api.on("error", this.onEvent("error"));

        this.server.on("listening", this.onEvent("listening"));
        this.server.on("error", this.onEvent("error"));
    }

    private onEvent(event: string) {
        // event relay
        let fn = (...paylaod: any[]) => {
            this.emit(event, ...paylaod);
        };
        return fn.bind(this);
    }

}
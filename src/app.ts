import * as http from "http";
import * as express from "express";

import { HandlerAPI, HandlerAPIConfig } from "./server/server";
import { CWManageConfig } from "./cwmanage/client";
import { SlackBot, SlackBotConfig } from "./bot/bot";
import { TeamModel } from "./teams/interfaces";
import { TeamStore } from "./teams/store";

export interface AppConfig {
    server: HandlerAPIConfig;
    slack: SlackBotConfig;
    team?: TeamModel;
}

export class SlackApp {
    private readonly config: AppConfig;
    private readonly bot: SlackBot;
    private readonly api: HandlerAPI;
    private readonly server: http.Server;
    private readonly teams: TeamStore;



    constructor (config: AppConfig, teams: TeamStore) {
        this.config = config;

        this.teams = teams;
        this.bot = new SlackBot(this.config.slack, this.teams);
        this.api = new HandlerAPI(config.server, this.bot);
        this.server = http.createServer(this.api.interface);
    }

    public launch () {
        this.server.listen(this.config.server.port);
        this.server.on("error", this.onError.bind(this));
        this.server.on("listening", this.onListening.bind(this));
    }

    private onError(error) {
        if (error.syscall !== "listen")
            throw error;

        let bind = typeof this.config.server.port === "string"
            ? "Pipe " + this.config.server.port
            : "Port " + this.config.server.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges!`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use!`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening() {
        let addr = this.server.address();
        let bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        console.info(`Listening on ${bind}`);
    }

}
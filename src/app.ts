import * as http from "http";
import * as express from "express";

import { HandlerServer } from "./server/server";
import { CWManageConfig } from "./cwmanage/client";
import cwmanage from "./cwmanage/client";
import bot from "./bot/bot";

export interface AppConfig {
    app: {
        environment: string;
        port: number;
    };
    slack: { token: string; };
    cwmanage: CWManageConfig;
}

export class App {
    private appWebhook: express.Application;
    private svrWebhook: http.Server;
    private config: AppConfig;

    constructor () {
        this.appWebhook = HandlerServer.bootstrap().app;
        this.svrWebhook = http.createServer(this.appWebhook);
    }

    public configure (config: AppConfig) {
        this.config = config;
        this.config.app.port = this.normalizePort(config.app.port || 3000);

        this.appWebhook.set("port", this.config.app.port);
        cwmanage.configure(config.cwmanage);
        bot.configure(config.slack);
    }

    public launch () {
        this.svrWebhook.listen(this.config.app.port);
        this.svrWebhook.on("error", this.onError.bind(this));
        this.svrWebhook.on("listening", this.onListening.bind(this));
    }

    /**
     * Normalize a port into a number, string, or false.
     */
    private normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port))
            return val;

        if (port >= 0)
            return port;

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    private onError(error) {
        if (error.syscall !== "listen")
            throw error;

        let bind = typeof this.config.app.port === "string"
            ? "Pipe " + this.config.app.port
            : "Port " + this.config.app.port;

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

    /**
     * Event listener for HTTP server "listening" event.
     */
    private onListening() {
        let addr = this.svrWebhook.address();
        let bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        console.info(`Listening on ${bind}`);
    }

}
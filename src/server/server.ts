import * as express from "express";
import * as bodyParser from "body-parser";

import { SlackBot } from "../bot/bot";
import { AppLocal } from "./interfaces/app-local";
import { IndexRoute } from "./routes/index";

interface HandlerAPIApp extends express.Application {
    locals: AppLocal;
}

export interface HandlerAPIConfig {
    port?: string | number;
    basePath?: string;
}

export class HandlerAPI {
    private config: HandlerAPIConfig;
    public application: HandlerAPIApp;

    constructor(config: HandlerAPIConfig, bot: SlackBot) {
        this.config = config;
        this.application = express();

        this.application.locals.bot = bot;
        this.middlewares();
        this.routes();
    }

    public get interface() {
        return this.application;
    }

    private middlewares (): void {
        this.interface.use(bodyParser.json());
        this.interface.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes(): void {
        let router = express.Router();

        IndexRoute.create(router);

        if (!!this.config.basePath && this.config.basePath !== "") {
            this.interface.use(this.config.basePath, router);
        } else {
            this.interface.use(router);
        }
    }
}
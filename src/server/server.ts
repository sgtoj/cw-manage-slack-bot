import * as express from "express";
import * as bodyParser from "body-parser";

import { IndexRoute } from "./routes/index";

export interface HandlerServerConfig {
    port?: number;
    basePath?: string;
}

export class HandlerServer {
    public app: express.Application;
    private config: HandlerServerConfig;

    constructor(config?: HandlerServerConfig) {
        this.config = config || {} as HandlerServerConfig;

        this.app = express();

        this.configure();
        this.routes();
    }

    public static bootstrap(config?: HandlerServerConfig): HandlerServer {
        return new HandlerServer(config);
    }

    private configure (): void {
        if (!this.config.port)
            this.config.port = 80;

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes(): void {
        let router = express.Router();

        IndexRoute.create(router);

        if (!!this.config.basePath && this.config.basePath !== "") {
            this.app.use(this.config.basePath, router);
        } else {
            this.app.use(router);
        }
    }
}
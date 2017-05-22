import * as express from "express";
import * as bodyParser from "body-parser";

import { IndexRoute } from "./routes/index";

export class HandlerServer {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.configure();
        this.routes();
    }

    public static bootstrap(): HandlerServer {
        return new HandlerServer();
    }

    private configure (): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes(): void {
        let router = express.Router();

        IndexRoute.create(router);

        this.app.use(router);
    }
}
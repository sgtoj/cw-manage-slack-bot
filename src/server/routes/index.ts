import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";

import { SlackEventMetaData } from "../../slack/interfaces";
import { SlackCallbackRequest } from "../interfaces/slack";
import slackEventHandlers from "../handlers/handles";

/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public post(req: Request, res: Response, next: NextFunction) {
        const payload: SlackEventMetaData = req.body;

        console.log(`New Request: ${JSON.stringify(payload)}`);

        const handler = slackEventHandlers.find(handler => {
            return handler.type === payload.type;
        });

        if (handler)
            handler.handle(req, res, next);
    }

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        const route = new IndexRoute();

        //  add home page route
        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            route.post(req, res, next);
        });
    }

}
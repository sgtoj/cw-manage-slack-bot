import { NextFunction, Response } from "express";
import { SlackCallbackRequest } from "../interfaces/slack";

export class EventCallback {

    public static get type() {
       return "event_callback";
    }

    public static handle(req: SlackCallbackRequest, res: Response, next: NextFunction) {
        res.status(200);
        res.end();
        req.app.locals.bot.receive(req.body);
    }

}


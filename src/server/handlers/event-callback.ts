import { NextFunction, Response } from "express";
import { SlackCallbackRequest } from "../interfaces/slack";
import bot from "../../bot/bot";

export class EventCallback {

    public static get type() {
       return "event_callback";
    }

    public static handle(req: SlackCallbackRequest, res: Response, next: NextFunction) {
        bot.handle(req.body.event);
        res.status(200);
        res.end();
    }

}


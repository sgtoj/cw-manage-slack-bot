import { NextFunction, Request, Response } from "express";
import { EventCallback } from "./event-callback";
import { UrlVerification } from "./url-verification";

export interface Handler {
    type: string;
    handle(req: Request, res: Response, next: NextFunction): void;
}


const slackEventHandlers: Array<Handler> = [
    EventCallback,
    UrlVerification
];

export default slackEventHandlers;
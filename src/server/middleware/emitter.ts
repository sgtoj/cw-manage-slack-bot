import { EventEmitter } from "events";
import { Request, Response, NextFunction } from "express";

export class RequestEmitter {

    public static register(subject: EventEmitter) {
        return function (req: Request, res: Response, next: NextFunction) {
            let method = req.method.toLowerCase();

            let payload = {
                body: JSON.parse(JSON.stringify(req.body)),
                hostname: req.hostname,
                path: req.path
            };

            try {
                // mask the text of message for privacy
                payload.body.event.text = payload.body.event.text.replace(/./g, "*");
            } catch (e) {
                // ignore error
            }

            subject.emit(method, payload);
            next();
        };
    }

}

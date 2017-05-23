import { NextFunction, Request, Response } from "express";

export class UrlVerification {

    public static get type() {
       return "url_verification";
    }

    public static handle(req: Request, res: Response, next: NextFunction) {
        res.send(req.body.challenge);
        res.end();
    }

}


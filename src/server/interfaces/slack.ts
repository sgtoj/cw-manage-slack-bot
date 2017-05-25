import { Application, Request } from "express";
import { SlackEventMetaData } from "../../slack/interfaces";
import { AppLocal } from "./app-local";

export interface HandlerApiRequest extends Application {
    locals: AppLocal;
}

export interface SlackCallbackRequest extends Request {
    app: HandlerApiRequest;
    body: SlackEventMetaData;
}

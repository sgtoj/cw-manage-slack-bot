import { Request } from "express";
import { SlackEventMetaData } from "../../slack/interfaces";


export interface SlackCallbackRequest extends Request {
    body: SlackEventMetaData;
}

import { SlackEvent } from "../../slack/interfaces";
import { SlackBot } from "../bot";
import { Message } from "./message";

export interface Handler {
    type: string;
    handle(bot: SlackBot, event: SlackEvent): void;
}

const handlers: Array<Handler> = [
    Message
];

export default handlers;
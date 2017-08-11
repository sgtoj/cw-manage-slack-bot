import { SlackEvent } from "../../slack/interfaces";
import { Team } from "../../teams/team";
import { SlackApiClient } from "../api/client";

import { Message, BotMessageConfig } from "./message";

export interface HandlerFunction {
    match(event: SlackEvent): boolean;
    handle(team: Team, event: SlackEvent, apiClient: SlackApiClient): void;
}

export interface HandlerConfig {
    messageConfig: BotMessageConfig;
}

export class HandlerArray extends Array<HandlerFunction> {

    constructor(config: HandlerConfig) {
        // list of intialized handlers
        super(
            new Message(config.messageConfig)
        );
    }

}
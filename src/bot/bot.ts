import * as http from "http";
import { EventEmitter } from "events";

import { Team } from "../teams/team";
import { TeamStore } from "../teams/store";
import { SlackEvent, SlackEventMetaData } from "../slack/interfaces";
import { HandlerArray, HandlerConfig, HandlerFunction } from "./handlers/handlers";
import { SlackApiClient } from "./api/client";

export interface SlackBotConfig {
    authToken: string;
    botAuthToken: string;
    validationToken: string;
    handlerConfig: HandlerConfig;
}

export class SlackBot extends EventEmitter {
    private readonly apiClient: SlackApiClient;
    private readonly teamStore: TeamStore;
    private readonly config: SlackBotConfig;
    private readonly handlers: HandlerArray;


    constructor(config: SlackBotConfig, teamStore: TeamStore) {
        super();
        this.config = config;

        let apiConfig = {
            authToken: this.authToken,
            botAuthToken: this.botAuthToken
        };
        this.apiClient = new SlackApiClient(apiConfig);
        this.apiClient.on("error", this.onEvent("error"));
        this.teamStore = teamStore;

        this.handlers = new HandlerArray(this.config.handlerConfig);
    }

    public get authToken() {
        return this.config.authToken;
    }

    public get botAuthToken() {
        return this.config.botAuthToken;
    }

    public get validationToken() {
        return this.config.validationToken;
    }

    public receive(payload: SlackEventMetaData) {
        if (!this.validate(payload))
            return;

        this.preprocess(payload);
    }

    private preprocess(payload: SlackEventMetaData) {
        let team = this.teamStore.find(payload.team_id);

        if (!team) {
            this.emit("unknownTeamId", payload.team_id);
        } else {
            team.on("issueNotFound", this.onEvent("issueNotFound"));
            this.process(team, payload.event);
        }
    }

    private process(team: Team, event: SlackEvent) {
        const callback = this.handlers.find(cb => {
            return cb.match(event);
        });

        if (!callback) {
            this.emit("noBotHandler", event);
        } else {
            let eventCopy = JSON.parse(JSON.stringify(event));

            try {
                // mask the text of message for privacy
                eventCopy.text = eventCopy.text.replace(/./g, "*");
            } catch (e) {
                // ignore error
            }

            this.emit("eventHandled", eventCopy);
            callback.handle(team, event, this.apiClient);
        }
    }

    private validate(payload: SlackEventMetaData): boolean {
        let failCount = 0;

        if (payload.token !== this.validationToken) {
            failCount++;

            this.emit("invalidBotToken", payload.token);
        }

        return failCount === 0;
    }

    private onEvent(event: string) {
        // event relay
        let fn = (...paylaod) => {
            this.emit(event, ...paylaod);
        };
        return fn.bind(this);
    }

}
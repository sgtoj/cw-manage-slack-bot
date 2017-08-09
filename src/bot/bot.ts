import * as http from "http";
import { EventEmitter } from "events";

import { Team } from "../teams/team";
import { TeamStore } from "../teams/store";
import { SlackEvent, SlackEventMetaData } from "../slack/interfaces";
import slackEventHandlers from "./handlers/handlers";
import { SlackApiClient } from "./api/client";

export interface SlackBotConfig {
    authToken: string;
    botAuthToken: string;
    validationToken: string;
}

export class SlackBot extends EventEmitter {
    private readonly apiClient: SlackApiClient;
    private readonly teamStore: TeamStore;
    private readonly config: SlackBotConfig;


    constructor(config: SlackBotConfig, teamStore: TeamStore) {
        super();
        this.config = config;

        this.teamStore = teamStore;
        this.apiClient = new SlackApiClient({ authToken: this.botAuthToken });
        this.apiClient.on("error", this.onEvent("error"));
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

        this.preproces(payload);
    }

    private preproces(payload: SlackEventMetaData) {
        let team = this.teamStore.find(payload.team_id);

        if (!team) {
            this.emit("unknownTeamId", payload.team_id);
        } else {
            team.on("issueNotFound", this.onEvent("issueNotFound"));
            this.process(team, payload.event);
        }
    }

    private process(team: Team, event: SlackEvent) {
        const callback = slackEventHandlers.find(cb => {
            return cb.match(event);
        });

        if (!callback) {
            this.emit("noBotHandler", event);
        } else {
            this.emit("eventHandled", event);
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
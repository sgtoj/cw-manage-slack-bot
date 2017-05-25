import * as http from "http";

import { Team } from "../teams/team";
import { TeamStore } from "../teams/store";
import { SlackEvent, SlackEventMetaData } from "../slack/interfaces";
import slackEventHandlers from "./handlers/handlers";
import { SlackApiClient } from "./api/client";

export interface SlackBotConfig {
    authToken: string;
    validationToken: string;
}

export class SlackBot {
    private readonly apiClient: SlackApiClient;
    private readonly teamStore: TeamStore;
    private readonly config: SlackBotConfig;


    constructor(config: SlackBotConfig, teamStore: TeamStore) {
        this.config = config;

        this.teamStore = teamStore;
        this.apiClient = new SlackApiClient({ authToken: this.authToken });
    }

    public get authToken() {
        return this.config.authToken;
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

         if (!team)
            return;

         this.process(team, payload.event);
    }

    private process(team: Team, event: SlackEvent) {
        const callback = slackEventHandlers.find(cb => {
            return cb.type === event.type;
        });

        if (callback) {
            callback.handle(team, event, this.apiClient);
        } else {
            console.log(event);
        }
    }

    private validate(payload: SlackEventMetaData): boolean {
        let failCount = 0;

        if (payload.token !== this.validationToken) {
            failCount++;
            console.error(`Event Token Mismatch: ${payload.token}`);
        }

        return failCount === 0;
    }

}
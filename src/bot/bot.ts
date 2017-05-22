import * as http from "http";

import { SlackEvent } from "../slack/interfaces";
import slackEventHandlers from "./handlers/handlers";
import { SlackApiClient } from "./api/client";
import client from "./api/client";


export class SlackBot {
    private _token: string;
    private _client: SlackApiClient;

    constructor() {
        this._client = client;
    }

    public get client () {
        return this._client;
    }

    public get token() {
        return this._token;
    }

    public configure (config) {
        this._token = config.token;
    }

    public handle(event: SlackEvent) {
        const callback = slackEventHandlers.find(cb => {
            return cb.type === event.type;
        });

        if (callback) {
            callback.handle(bot, event);
        } else {
            console.log(callback);
        }
    }

}

const bot = new SlackBot();
export default bot;
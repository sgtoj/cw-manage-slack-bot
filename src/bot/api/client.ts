import * as https from "https";
import * as querystring from "querystring";
import { EventEmitter } from "events";

import { PostPayload } from "./interface";
import { post } from "../helpers/request";

const PROTOCOL = "https:";
const HOSTNAME = "slack.com";
const PATH_PREFIX = "/api";
const POST_CONTENT_TYPE = "application/x-www-form-urlencoded";

export interface SlackApiClientConfig {
    authToken: string;
}

export class SlackApiClient extends EventEmitter {
    private config: SlackApiClientConfig;

    constructor(config: SlackApiClientConfig) {
        super();
        this.config = config;
    }

    private get authToken() {
        return this.config.authToken;
    }

    public async post(method: string, payload: PostPayload) {
        const option = this.postOption(method);

        let result: any;
        try {
            payload.token = this.authToken;
            result = await post(option, payload.toBody());
        } catch (e) {
            this.emit("error", e);
        }

        return result;
    }

    private postOption(method): https.RequestOptions {
        let option: https.RequestOptions = {
            protocol: PROTOCOL,
            hostname: HOSTNAME,
            method: "POST",
            path: `${PATH_PREFIX}/${method}`,
            headers: {
                "Content-Type": POST_CONTENT_TYPE
            }
        };

        return option;
    }

}
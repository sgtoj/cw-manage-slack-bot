import * as https from "https";
import * as querystring from "querystring";

import { PostPayload } from "./interface";
import { post } from "../helpers/request";

const PROTOCOL = "https:";
const HOSTNAME = "slack.com";
const PATH_PREFIX = "/api";
const POST_CONTENT_TYPE = "application/x-www-form-urlencoded";

export interface SlackApiClientConfig {
    authToken: string;
}

export class SlackApiClient {
    private config: SlackApiClientConfig;

    constructor(config: SlackApiClientConfig) {
        this.config = config;
    }

    private get authToken() {
        return this.config.authToken;
    }

    public async post (method: string, payload: PostPayload) {
        let option: https.RequestOptions = {
            protocol: PROTOCOL,
            hostname: HOSTNAME,
            method: "POST",
            path: `${PATH_PREFIX}/${method}`,
            headers: {
                "Content-Type": POST_CONTENT_TYPE
            }
        };

        let result: any;
        try {
            payload.token = this.authToken;
            result = await post(option, payload.toBody());
        } catch (e) {
            console.error(e);
        }

        return result;
    }

}
import * as https from "https";
import * as querystring from "querystring";

import { post } from "../helpers/request";

const PROTOCOL = "https:";
const HOSTNAME = "slack.com";
const PATH_PREFIX = "/api";
const POST_CONTENT_TYPE = "application/x-www-form-urlencoded";

export class SlackApiClient {

    public async post (method: string, body: any) {
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
            result = await post(option, body);
        } catch (e) {
            console.error(e);
        }

        return result;
    }

}

const client = new SlackApiClient();
Object.freeze(client);
export default client;
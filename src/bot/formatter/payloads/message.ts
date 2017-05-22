import { Payload } from "./payload";
import * as querystring from "querystring";

interface MessageArugment {
    token: string;
    channel: string;
    text?: string;
    parse?: string;
    link_names?: boolean;
    attachments?: Array<any>;
    unfurl_links?: boolean;
    unfurl_media?: boolean;
    username?: string;
    as_user?: boolean;
    icon_url?: string;
    icon_emoji?: string;
    thread_ts?: number;
    reply_broadcast?: boolean;
}

export class MessagePayload extends Payload implements MessageArugment {
    protected arguments: MessageArugment;

    constructor () {
        super();
        this.arguments.attachments = [];
    }

    public get token () {
        return this.arguments.token;
    }

    public set token (value) {
        this.arguments.token = value;
    }

    public get channel () {
        return this.arguments.channel;
    }

    public set channel (value) {
        this.arguments.channel = value;
    }

    public get text () {
        return this.arguments.text;
    }

    public set text (value) {
        this.arguments.text = value;
    }

    public get parse () {
        return this.arguments.parse;
    }

    public set parse (value) {
        this.arguments.parse = value;
    }

    public get link_names () {
        return this.arguments.link_names;
    }

    public set link_names (value) {
        this.arguments.link_names = value;
    }

    public get attachments () {
        return this.arguments.attachments;
    }

    public set attachments (value) {
        this.arguments.attachments = value;
    }

    public get unfurl_links () {
        return this.arguments.unfurl_links;
    }

    public set unfurl_links (value) {
        this.arguments.unfurl_links = value;
    }

    public get unfurl_media () {
        return this.arguments.unfurl_media;
    }

    public set unfurl_media (value) {
        this.arguments.unfurl_media = value;
    }

    public get username () {
        return this.arguments.username;
    }

    public set username (value) {
        this.arguments.username = value;
    }

    public get as_user () {
        return this.arguments.as_user;
    }

    public set as_user (value) {
        this.arguments.as_user = value;
    }

    public get icon_url () {
        return this.arguments.icon_url;
    }

    public set icon_url (value) {
        this.arguments.icon_url = value;
    }

    public get icon_emoji () {
        return this.arguments.icon_emoji;
    }

    public set icon_emoji (value) {
        this.arguments.icon_emoji = value;
    }

    public get thread_ts () {
        return this.arguments.thread_ts;
    }

    public set thread_ts (value) {
        this.arguments.thread_ts = value;
    }

    public get reply_broadcast () {
        return this.arguments.reply_broadcast;
    }

    public set reply_broadcast (value) {
        this.arguments.reply_broadcast = value;
    }

    public stringify () {
        let payload = super.stringify();
        let excapeAttachments = querystring.escape(JSON.stringify(this.arguments.attachments));
        payload = payload.replace("attachments=", `attachments=${excapeAttachments}`);

        return payload;
    }

}
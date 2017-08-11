import { Team } from "../../teams/team";
import { SlackEvent } from "../../slack/interfaces";
import { CWManageTicket } from "../../cwmanage/interface";
import { SlackApiClient } from "../api/client";
import { extractCWManageTicketNumber } from "../helpers/filter";
import { formatTicketMessage } from "../formatter/ticket";

export interface BotMessageConfig {
    footer?: string;
    footerIcon: string;
}

export class Message {
    private readonly config;

    constructor(config: BotMessageConfig) {
        this.config = config;
    }

    public match(event: SlackEvent): boolean {
        return event.type === "message" && this.isValidMessage(event);
    }

    public async handle(team: Team, event: SlackEvent, apiClient: SlackApiClient) {
        if (this.isEditedMessage(event)) return;

        let numbers = extractCWManageTicketNumber(event.text);
        if (!numbers) return null;

        let tickets = await this.tickets(team, numbers);
        if (tickets.length <= 0) return null;

        this.send(event.channel, tickets, apiClient);
    }

    private async send(channel: string, tickets: Array<CWManageTicket>, apiClient: SlackApiClient) {
        let message = formatTicketMessage(tickets, this.config);
        message.channel = channel;

        apiClient.post("chat.postMessage", message);
    }


    private async tickets(team: Team, numbers: Array<string>) {
        let tickets = Array<CWManageTicket>();

        for (let num of numbers) {
            let ticket = await team.cwmanage.findTicket(num);
            if (!ticket)
                continue;
            tickets.push(ticket);
        }

        return tickets;
    }

    private isValidMessage(event: SlackEvent): boolean {
        if (this.isBotMessage(event))
            return false;

        if (this.isEditedMessage(event))
            return false;

        return true;
    }

    private isEditedMessage(event: SlackEvent): boolean {
        return !!event.previous_message;
    }

    private isBotMessage(event: SlackEvent): boolean {
        return !!event.subtype && event.subtype === "bot_messasge";
    }
}

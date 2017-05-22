import { extractCWManageTicketNumber } from "../helpers/filter";
import { SlackEvent } from "../../slack/interfaces";
import { CWManageTicket } from "../../cwmanage/interface";
import { formatTicketMessage } from "../formatter/ticket";
import { SlackBot } from "../bot";
import cwmanage from "../../cwmanage/client";

export class Message {

    public static get type() {
       return "message";
    }

    public static async handle(bot: SlackBot, event: SlackEvent) {
        if (event.previous_message) return null;

        let ticketNumbers = extractCWManageTicketNumber(event.text);
        if (!ticketNumbers) return null;

        let tickets = await this.tickets(ticketNumbers);
        if (tickets.length <= 0) return null;

        let message = formatTicketMessage(tickets);
        message.token = bot.token;
        message.channel = event.channel;

        bot.client.post("chat.postMessage", message.stringify());
    }

    private static async tickets (ticketNumbers: Array<string>) {
        let tickets = Array<CWManageTicket>();

        for (let ticketNumber of ticketNumbers) {
            let ticket = await cwmanage.findTicket(ticketNumber);
            if (!ticket)
                continue;
            tickets.push(ticket);
        }

        return tickets;
    }

}

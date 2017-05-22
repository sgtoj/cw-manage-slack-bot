import { CWManageTicket } from "../../cwmanage/interface";
import { MessagePayload } from "./payloads/message";

const CARD_COLOR = "#0067B1";

export function formatTicketMessage (tickets: Array<CWManageTicket>): MessagePayload {
    let message = new MessagePayload();

    for (let ticket of tickets) {
        let attachment = {
            "title": `#${ticket.id}: ${ticket.summary}`,
            "title_link": ticket.url,
            "color": CARD_COLOR,
            "fields": [{
                    "title": "Status",
                    "value": ticket.status.name || "Unknown",
                    "short": true
                },
                {
                    "title": "Contact",
                    "value": ticket.contact.name || "Unknown",
                    "short": true
                }
            ],
            "footer": ticket.host,
            "footer_icon": "http://i.imgur.com/0Ndqgz3.png",
            "ts": (new Date()).getTime() / 1000
        };

        // TODO: make footer and footer_icon dynamic

        message.attachments.push(attachment);
    }

    return message;

}
import { CWManageTicket } from "../../cwmanage/interface";
import { MessagePayload } from "./payloads/message";
import { BotMessageConfig } from "../handlers/message";

const CARD_COLOR = "#0067B1";

export function formatTicketMessage (tickets: Array<CWManageTicket>, config: BotMessageConfig): MessagePayload {
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
            "footer": config.footer || ticket.host,
            "footer_icon": config.footerIcon,
            "ts": (new Date()).getTime() / 1000
        };

        message.attachments.push(attachment);
    }

    return message;

}
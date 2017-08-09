import { EventEmitter } from "events";

import * as CWManageClient from "connectwise-rest";
import { CWManageTicket } from "./interface";


export interface CWManageConfig {
    [name: string]: any;
    companyId: string;
    companyUrl: string;
    publicKey: string;
    privateKey: string;
    timeout: number;
}

interface CWManageError {
    [name: string]: any;
}

export class CWManage extends EventEmitter {
    private readonly config: CWManageConfig;
    private readonly client: any;

    constructor(config: CWManageConfig) {
        super();
        this.config = config;
        this.client = new CWManageClient(config);
    }

    public async findTicket(ticketNumber: string): Promise<CWManageTicket | undefined> {
        let ticket: CWManageTicket;

        try {
            ticket = await this.client.ServiceDeskAPI.Tickets.getTicketById(ticketNumber);
            ticket.host = this.config.companyUrl;
            ticket.url = `https://${ticket.host}/v4_6_release/services/system_io/Service/fv_sr100_request.rails?service_recid=${ticket.id}`;
        } catch (e) {
            console.error(e);
        }

        return ticket;
    }
}
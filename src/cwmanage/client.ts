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

export class CWManage {
    private client: any;
    private config: CWManageConfig;

    constructor () {
    }

    public configure(config: CWManageConfig) {
        this.config = config;
        this.client = new CWManageClient(config);
    }

    public async findTicket (ticketNumber: string): Promise<CWManageTicket> {
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

const cwmanage = new CWManage();
export default cwmanage;

export interface CWManageTicket {
    [name: string]: any;
    id: number;
    summary: string;
    recordType: "ServiceTicket";
    board: {
        id: number;
        name: string;
        _info: { board_href: string; }
    };
    status: {
        id: number;
        name: string;
        _info: { status_href: string; }
    };
    company: {
        id: number;
        identifier: string;
        name: string;
        _info: { status_href: string; }
    };
    contact: {
        id: number;
        name: string;
        _info: { contact_href: string; }
    };
    team: {
        id: number;
        name: string;
        _info: { team_href: string; }
    };
    priority: {
        id: number;
        name: string;
        sort: number;
        _info: {
            priority_href: string;
            image_href: string;
        }
    };
}
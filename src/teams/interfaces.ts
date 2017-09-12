export interface CWManageModel {
    [name: string]: any;
    companyId: string;
    companyUrl: string;
    publicKey: string;
    privateKey: string;
    timeout: string | number;
}

export interface TeamModel {
    teamId: string;
    cwmanage: CWManageModel;
}

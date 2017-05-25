import { CWManage } from "../cwmanage/client";
import { TeamModel } from "./interfaces";

export class Team {
    private readonly model: TeamModel;
    private readonly cwManageClient: CWManage;

    constructor(model: TeamModel) {
        this.model = model;
        this.cwManageClient = new CWManage(model.cwmanage);
    }

    public get teamId(): string {
        return this.model.teamId;
    }

    public get cwmanage(): CWManage {
        return this.cwManageClient;
    }
}
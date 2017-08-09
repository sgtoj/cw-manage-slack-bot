import { EventEmitter } from "events";

import { CWManage } from "../cwmanage/client";
import { TeamModel } from "./interfaces";

export class Team extends EventEmitter {
    private readonly model: TeamModel;
    private readonly cwManageClient: CWManage;

    constructor(model: TeamModel) {
        super();
        this.model = model;
        this.cwManageClient = new CWManage(model.cwmanage);
        this.cwManageClient.on("issueNotFound", this.onEvent("issueNotFound"));
        this.cwManageClient.on("error", this.onEvent("error"));
    }

    public get teamId(): string {
        return this.model.teamId;
    }

    public get cwmanage(): CWManage {
        return this.cwManageClient;
    }

    private onEvent(event: string) {
        // event relay
        let fn = (...paylaod: any[]) => {
            this.emit(event, ...paylaod);
        };
        return fn.bind(this);
    }
}
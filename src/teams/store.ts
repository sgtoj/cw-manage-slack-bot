import { TeamModel } from "./interfaces";
import { Team } from "./team";

interface InternalStore {
    [teamId: string]: Team;
}

export class TeamStore {
    private readonly store: InternalStore;

    constructor() {
        this.store = {};
    }

    public add(teamModel: TeamModel) {
        this.store["master"] = this.team(teamModel);
    }

    public find(teamId: string): Team {
        return this.store["master"];
    }

    private team(teamModel: TeamModel): Team {
        return new Team(teamModel);
    }
}
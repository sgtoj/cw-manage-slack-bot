import * as querystring from "querystring";
import { PostPayload } from "../../api/interface";

export interface ApiArugment {
    [name: string]: any;
    token: string;
}

export abstract class ApiPayload implements ApiArugment, PostPayload {
    protected arguments: ApiArugment;

    constructor () {
        this.arguments = {} as ApiArugment;
    }

    public get token() {
        return this.arguments.token;
    }

    public set token(value) {
        this.arguments.token = value;
    }

    public abstract toBody (): string | object;
}
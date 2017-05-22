import * as querystring from "querystring";

interface ApiArugment {
    token: string;
    [name: string]: any;
}

export class Payload implements ApiArugment {
    protected arguments: ApiArugment;

    constructor () {
        this.arguments = {} as ApiArugment;
    }

    public get token () {
        return this.arguments.token;
    }

    public stringify () {
        let payload = querystring.stringify(this.arguments);
        return payload;
    }

}
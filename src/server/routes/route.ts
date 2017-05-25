import { NextFunction, Request, Response } from "express";

export class BaseRoute {
    private scripts: string[];

    constructor() {
        this.scripts = [];
    }

    public addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }

}
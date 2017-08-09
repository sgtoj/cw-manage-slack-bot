import { EventEmitter } from "events";
import { SlackApp } from "./app";


export function enableLogging(app: SlackApp | null | undefined) {

    if (app) {
        app.on("error", error => {
            console.error(error);
        });

        app.on("listening", () => {
            console.log("Server is listening...");
        });

        app.on("getRequest", req => {
            console.log(`Incoming GET Request: ${JSON.stringify(req)}`);
        });

        app.on("postRequest", req => {
            console.log(`Incoming POST Request: ${JSON.stringify(req)}`);
        });

        app.on("issueNotFound", num => {
            console.log(`Jira Issue Not Found: ${num}`);
        });

        app.on("eventHandled", event => {
            console.log(`New Bot Event Received: ${JSON.stringify(event)}`);
        });
    }

}
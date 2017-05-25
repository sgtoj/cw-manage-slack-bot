export interface PostPayload {
    token: string;
    toBody(): string | object;
}
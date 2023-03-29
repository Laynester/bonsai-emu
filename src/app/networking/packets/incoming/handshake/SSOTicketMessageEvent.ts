import { IncomingMessage } from '../IncomingMessage';

export class SSOTicketMessageEvent extends IncomingMessage {
    private _ticket: string;

    public parse(): void {
        this._ticket = this.readString();
    }

    public get ticket(): string {
        return this._ticket;
    }
}

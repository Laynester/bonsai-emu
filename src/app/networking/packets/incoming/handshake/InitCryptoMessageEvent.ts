import { IncomingMessage } from '../IncomingMessage';

export class InitCryptoMessageEvent extends IncomingMessage {
    private _connectionMode: number;

    public parse(): void {
        this._connectionMode = this.readInt();
    }

    public get connectionMode(): number {
        return this._connectionMode;
    }
}

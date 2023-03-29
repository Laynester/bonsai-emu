import { IncomingMessage } from '../IncomingMessage';

export class OpenFlatConnectionEvent extends IncomingMessage {
    private _flatId: number;
    private _password: string;
    private _unknown: boolean;

    public parse() {
        this._flatId = this.readInt();
        this._password = this.readString();
        this._unknown = this.readBoolean();
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get password(): string {
        return this._password;
    }
}

import { IncomingMessage } from '../IncomingMessage';

export class RoomEntryDataEvent extends IncomingMessage {
    private _roomId: number;
    private _roomCategory: number;

    public parse(): void {
        this._roomId = this.readInt();
        this._roomCategory = this.readInt();
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get roomCategory(): number {
        return this._roomCategory;
    }
}

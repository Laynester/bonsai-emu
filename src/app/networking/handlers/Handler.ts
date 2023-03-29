import { GameClient } from '../../';
import { IncomingMessage } from '../packets';

export type HandlerListener = (
    event: IncomingMessage,
    client: GameClient,
) => void;

export class Handler {
    private _listeners: Map<number, HandlerListener>;

    constructor() {
        this._listeners = new Map();
    }

    public addListener(header: number, callback: HandlerListener) {
        this._listeners.set(header, callback);
    }

    public removeListener(header: number) {
        this._listeners.delete(header);
    }

    public trigger(header: number, event: IncomingMessage, client: GameClient) {
        for (const value of this._listeners) {
            if (value[0] == header) value[1](event, client);
        }
    }
}

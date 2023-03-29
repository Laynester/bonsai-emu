import { Socket } from 'net';
import { GetServer } from '../../../api';
import { Logger } from '../../../common';
import { Habbo } from '../../../hotel';
import { IncomingMessage } from '../packets';
import { OutgoingMessage } from '../packets/outgoing/OutgoingMessage';

export class GameClient {
    private _socket: Socket;
    private _habbo: Habbo;

    private LOGGER: Logger = new Logger(this.constructor.name);

    private firstMessageComplete = false;

    constructor(id: number, socket: Socket) {
        this._socket = socket;

        this._socket.on('data', this.onData.bind(this));
        this._socket.on('close', this.onClose.bind(this));
    }

    private onData(data: Buffer): void {
        if (data[0] == 64) {
            const clone: Buffer = Buffer.from(data);
            const packet = new IncomingMessage();

            packet.init(clone);

            console.log('recieved', packet.getMessageBody());

            GetServer().packetManager.eventRecieved(
                packet.getHeaderId(),
                data,
                this,
            );
        } else {
            const xml =
                '<?xml version="1.0"?>\r\n<!DOCTYPE cross-domain-policy SYSTEM "/xml/dtds/cross-domain-policy.dtd">\r\n<cross-domain-policy>\r\n<allow-access-from domain="*" to-ports="1-31111" />\r\n</cross-domain-policy>\0';

            this._socket.write(Buffer.from(xml, 'utf8'), (err: Error) => {
                this.socket.end();
            });
        }
    }

    private onClose(): void {
        //
    }

    public get socket(): Socket {
        return this._socket;
    }

    public sendResponse(message: OutgoingMessage) {
        if (this._socket == null) return;
        if (this._socket.connecting) return;

        console.log('sending ', message.bodyToString());

        this._socket.write(message.getBytes());
    }

    public disconnect(message: string = null): void {
        this._socket.end();

        this.LOGGER.warn(message);

        this._socket = null;
    }

    public get habbo(): Habbo {
        return this._habbo;
    }

    public set habbo(habbo: Habbo) {
        this._habbo = habbo;
    }
}

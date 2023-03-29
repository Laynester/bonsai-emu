import { GameClient } from '../..';
import { Handler, HandshakeHandler } from '../handlers';
import { InventoryHandler } from '../handlers/InventoryHandler';
import { RoomHandler } from '../handlers/room/RoomHandler';
import {
    GetCreditsInfoEvent,
    IncomingMessage,
    InfoRetrieveMessageEvent,
    InitCryptoMessageEvent,
    SSOTicketMessageEvent,
} from './incoming';
import { IncomingHeaders } from './util';

export class PacketManager {
    private handlers: Handler[] = [];
    private incoming: Map<number, IncomingMessage>;

    constructor() {
        this.incoming = new Map();
        this.registerHandlers();
        this.registerIncoming();
    }

    private registerHandlers(): void {
        this.handlers.push(
            new HandshakeHandler(),
            new InventoryHandler(),
            new RoomHandler(),
        );
    }

    public eventRecieved(
        header: number,
        data: Buffer,
        client: GameClient,
    ): void {
        if (!header || header < 0 || !client) return;

        const packet = this.incoming.get(header);

        if (!this.incoming.get(header)) return;

        const parsed = packet.init(data);

        for (const handler of this.handlers) {
            handler.trigger(header, parsed, client);
        }
    }

    private registerIncoming(): void {
        this.incoming.set(
            IncomingHeaders.INIT_CRYPTO,
            new InitCryptoMessageEvent(),
        );

        this.incoming.set(
            IncomingHeaders.SSO_TICKET,
            new SSOTicketMessageEvent(),
        );

        this.incoming.set(
            IncomingHeaders.INFO_RETRIEVE,
            new InfoRetrieveMessageEvent(),
        );

        this.incoming.set(
            IncomingHeaders.GET_CREDITS,
            new GetCreditsInfoEvent(),
        );
    }
}

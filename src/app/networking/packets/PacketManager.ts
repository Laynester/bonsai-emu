import { GameClient } from '../..';
import { Handler, HandshakeHandler } from '../handlers';
import { InventoryHandler } from '../handlers/InventoryHandler';
import { RoomHandler } from '../handlers/room/RoomHandler';
import {
    FurnitureAliasesEvent,
    GetCreditsInfoEvent,
    GetRoomAdEvent,
    GuestRoomInfoEvent,
    IncomingMessage,
    InfoRetrieveMessageEvent,
    InitCryptoMessageEvent,
    OpenFlatConnectionEvent,
    RoomEntryDataEvent,
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
        // handshake
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

        // inventory

        this.incoming.set(
            IncomingHeaders.GET_CREDITS,
            new GetCreditsInfoEvent(),
        );

        // room
        this.incoming.set(
            IncomingHeaders.OPEN_FLAT_CONNECTION,
            new OpenFlatConnectionEvent(),
        );
        this.incoming.set(
            IncomingHeaders.FURNITURE_ALIASES,
            new FurnitureAliasesEvent(),
        );
        this.incoming.set(
            IncomingHeaders.ROOM_ENTRY_DATA,
            new RoomEntryDataEvent(),
        );
        this.incoming.set(
            IncomingHeaders.GUEST_ROOM_INFO,
            new GuestRoomInfoEvent(),
        );
        this.incoming.set(IncomingHeaders.ROOM_AD_INFO, new GetRoomAdEvent());
    }
}

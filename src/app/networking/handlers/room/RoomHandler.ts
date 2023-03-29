import { GetRooms } from '../../../../api';
import { Room } from '../../../../hotel';
import { GameClient } from '../../client';
import {
    FurnitureAliasesEvent,
    GetRoomAdEvent,
    GuestRoomInfoEvent,
    HeightMapComposer,
    OpenFlatConnectionEvent,
    RoomEntryDataEvent,
} from '../../packets';
import { FurnitureAliasesComposer } from '../../packets/outgoing/room/FurnitureAliasesComposer';
import { IncomingHeaders } from '../../packets/util';
import { Handler } from '../Handler';

export class RoomHandler extends Handler {
    constructor() {
        super();

        this.addListener(
            IncomingHeaders.OPEN_FLAT_CONNECTION,
            this.onOpenFlatConnection.bind(this),
        );

        this.addListener(
            IncomingHeaders.FURNITURE_ALIASES,
            this.onFurnitureAliases.bind(this),
        );

        this.addListener(
            IncomingHeaders.ROOM_ENTRY_DATA,
            this.onRoomEntryData.bind(this),
        );

        this.addListener(
            IncomingHeaders.GUEST_ROOM_INFO,
            this.onGuestRoomInfo.bind(this),
        );

        this.addListener(
            IncomingHeaders.ROOM_AD_INFO,
            this.onRoomAdInfo.bind(this),
        );
    }

    public async onOpenFlatConnection(
        event: OpenFlatConnectionEvent,
        client: GameClient,
    ): Promise<void> {
        const flatId = event.flatId;
        const password = event.password;

        if (!flatId) return;

        await GetRooms().attemptRoom(flatId, password, client.habbo);
    }

    public onFurnitureAliases(
        event: FurnitureAliasesEvent,
        client: GameClient,
    ): void {
        client.sendResponse(new FurnitureAliasesComposer());
    }

    public onRoomEntryData(event: RoomEntryDataEvent, client: GameClient) {
        const loadingId: number = client.habbo.loadingRoom;

        if (loadingId == -1) return;

        const room: Room = GetRooms().roomLoaded(loadingId);

        if (!room) return;

        client.sendResponses([
            new HeightMapComposer(room.model.serializeHeightmap()),
            room.model.serializeRelativeHeightmap(),
        ]);

        room.sendRoomInfo(client);

        client.habbo.loadingRoom = null;
        client.habbo.currentRoom = room;
    }

    public onGuestRoomInfo(event: GuestRoomInfoEvent, client: GameClient) {
        if (!client.habbo) return;

        const room: Room = client.habbo.currentRoom;

        if (!room) return;

        client.sendResponse(room.serialize());
    }

    public onRoomAdInfo(event: GetRoomAdEvent, client: GameClient) {
        if (!client.habbo) return;

        const room: Room = client.habbo.currentRoom;

        if (!room) return;

        room.sendRoomAd(client);
    }
}

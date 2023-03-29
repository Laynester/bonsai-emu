import { GetRooms } from '../../api';
import { GameClient, RoomEntity } from '../../app';
import {
    GuestRoomInfoComposer,
    RoomAdInfoComposer,
    RoomEntryInfoComposer,
    RoomPropertyComposer,
    RoomReadyComposer,
} from '../../app/networking/packets';
import { Habbo } from '../habbo';
import { RoomModel } from './RoomModel';

export class Room {
    private _id: number;
    private _name: string;
    private _desc: string;
    private _model: RoomModel;
    private _category: number;
    private _wallpaper: string;
    private _flooring: string;
    private _maxCount: number;

    constructor(entity: RoomEntity) {
        this._id = entity.id;
        this._name = entity.name;
        this._desc = entity.description;
        this._category = entity.category;
        this._wallpaper = entity.wallpaper;
        this._flooring = entity.flooring;

        this._maxCount = entity.usersMax;

        this._model = GetRooms().getModel(entity.model);
    }

    public loadRoomForHabbo(habbo: Habbo) {
        if (!habbo) return;

        habbo.loadingRoom = this._id;

        ///

        this.sendRoomData(habbo.client);
    }

    public sendRoomData(client: GameClient) {
        if (!client) return;

        if (!this._model) return;

        client.sendResponses([
            new RoomReadyComposer(this._model.name, this._name),
            new RoomPropertyComposer(this._wallpaper),
            new RoomPropertyComposer(this._flooring, 'floor'),
            new RoomPropertyComposer('0.0', 'landscape'),
        ]);
    }

    public sendRoomInfo(client: GameClient) {
        client.sendResponses([new RoomEntryInfoComposer(this._id)]);
    }

    public sendRoomAd(client: GameClient) {
        client.sendResponse(new RoomAdInfoComposer());
    }

    public serialize(): GuestRoomInfoComposer {
        const msg = new GuestRoomInfoComposer();

        msg.writeBoolean(true);

        msg.writeInt(this._id);
        msg.writeBoolean(false); // event
        msg.writeString(this._name);
        msg.writeString('username'); // room owner name
        msg.writeInt(0); // door state
        msg.writeInt(1); // user count
        msg.writeInt(this._maxCount);
        msg.writeStringBreak(this._desc);
        msg.writeBoolean(true); // search smth
        msg.writeBoolean(true); // allow trading
        msg.writeInt(0); // score
        msg.writeInt(this._category);
        msg.writeStringBreak(''); // event creation time

        msg.writeInt(0); // tag count

        msg.writeInt(0);
        msg.writeInt(0);
        msg.writeInt(0);

        msg.writeBoolean(true); // allow pets

        msg.writeBoolean(true); // forward
        msg.writeBoolean(false); // staff pick

        return msg;
    }

    public get model(): RoomModel {
        return this._model;
    }
}

import { RoomDao } from '../../app';
import { Habbo } from '../habbo';
import { Room } from './Room';
import { RoomModel } from './RoomModel';

export class RoomManager {
    private _rooms: Map<number, Room>;
    private _models: Map<string, RoomModel>;

    constructor() {
        this._rooms = new Map();
        this._models = new Map();
    }

    public async init(): Promise<void> {
        await this.loadModels();
    }

    public async loadModels(): Promise<void> {
        const models = await RoomDao.getModels();

        for (const model of models)
            this._models.set(model.name, new RoomModel(model));
    }

    public getModel(model: string): RoomModel {
        return this._models.get(model);
    }

    public roomLoaded(id: number): Room {
        const room = this._rooms.get(id);

        if (!room) return null;

        return room;
    }

    public async loadRoomInfo(id: number): Promise<Room> {
        let room = this.roomLoaded(id);
        if (room) return room;

        const data = await RoomDao.findRoom(id);
        if (!data) return null;

        room = new Room(data);

        this._rooms.set(id, room);

        return room;
    }

    public async attemptRoom(id: number, password: string, habbo: Habbo) {
        const room = await this.loadRoomInfo(id);

        if (!room) return null;

        room.loadRoomForHabbo(habbo);
    }
}

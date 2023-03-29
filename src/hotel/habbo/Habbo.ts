import { GameClient, HabboEntity, HabboGenderTypeEnum } from '../../app';
import {
    CreditBalanceComposer,
    HabboActivityPointNotificationComposer,
    HabboBroadcastComposer,
    ModMessageComposer,
    NavigatorSettingsComposer,
    OutgoingMessage,
    UserObjectComposer,
} from '../../app/networking/packets';
import { Room } from '../room';
import { AlertTypes } from '../util';

export class Habbo {
    private _id: number;
    public name: string;
    public machineId: string;
    public figure: string;
    public gender: HabboGenderTypeEnum;
    public homeRoom: number;

    private _credits: number;
    private _pixels: number;

    private _client: GameClient;

    public loadingRoom = -1;
    public currentRoom: Room;
    public roomIndex = -1;

    constructor(entity: HabboEntity) {
        this._id = entity.id;
        this.name = entity.name;
        this.machineId = null;
        this.figure = entity.figure;
        this.gender = entity.gender;

        this._credits = entity.credits;
        this._pixels = entity.pixels;

        this.homeRoom = entity.homeRoom;
    }

    public serializeObject(): void {
        this._client.sendResponse(
            new UserObjectComposer(
                this._id,
                this.name,
                this.figure,
                this.gender,
            ),
        );

        this._client.sendResponse(new NavigatorSettingsComposer(this.homeRoom));
    }

    public updateCredits(newVal = 0) {
        this._credits += newVal;
        this._client.sendResponse(new CreditBalanceComposer(this._credits));
    }

    public updatePixels(newVal = 0) {
        this._pixels += newVal;
        this._client.sendResponse(
            new HabboActivityPointNotificationComposer(this._pixels, newVal),
        );
    }

    public notify(message: string, type = AlertTypes.BROADCAST) {
        let composer: OutgoingMessage;

        switch (type) {
            case AlertTypes.MOD:
                composer = new ModMessageComposer(message);
                break;
            case AlertTypes.BROADCAST:
                composer = new HabboBroadcastComposer(message);
                break;
        }

        if (!composer) return;

        this._client.sendResponse(composer);
    }

    public get id(): number {
        return this._id;
    }

    public get client(): GameClient {
        return this._client;
    }

    public set client(client: GameClient) {
        this._client = client;
    }
}

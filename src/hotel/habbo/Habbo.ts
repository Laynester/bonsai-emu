import { GameClient, HabboEntity, HabboGenderTypeEnum } from '../../app';
import {
    CreditBalanceComposer,
    HabboActivityPointNotificationComposer,
    NavigatorSettingsComposer,
    UserObjectComposer,
} from '../../app/networking/packets';

export class Habbo {
    private _id: number;
    private _name: string;
    private _machineId: string;
    private _figure: string;
    private _gender: HabboGenderTypeEnum;
    private _homeRoom: number;

    private _credits: number;
    private _pixels: number;

    private _client: GameClient;

    constructor(entity: HabboEntity) {
        this._id = entity.id;
        this._name = entity.name;
        this._machineId = null;
        this._figure = entity.figure;
        this._gender = entity.gender;

        this._credits = entity.credits;
        this._pixels = entity.pixels;

        this._homeRoom = entity.homeRoom;
    }

    public serializeObject(): void {
        this._client.sendResponse(
            new UserObjectComposer(
                this._id,
                this._name,
                this._figure,
                this._gender,
            ),
        );

        this._client.sendResponse(
            new NavigatorSettingsComposer(this._homeRoom),
        );
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

    public set client(client: GameClient) {
        this._client = client;
    }

    public set machineId(uuid: string) {
        this._machineId = uuid;
    }
}

import { RoomModelEntity } from '../../app';
import { RelativeHeightMapComposer } from '../../app/networking/packets';

export class RoomModel {
    private _name: string;
    private _map: string;
    private _doorX: number;
    private _doorY: number;
    private _doorZ: number;
    private _doorDir: number;

    private _mapSizeX: number;
    private _mapSizeY: number;

    constructor(model: RoomModelEntity) {
        this._name = model.name;
        this._map = model.heightmap;
        this._doorX = model.doorX;
        this._doorY = model.doorY;
        this._doorZ = model.doorZ;
        this._doorDir = model.doorDir;

        const tmpHeightmap: string[] = this._map.split(String.fromCharCode(13));

        this._mapSizeX = tmpHeightmap[0].length;
        this._mapSizeY = tmpHeightmap.length;
    }

    public serializeHeightmap(): string {
        let heightMap = '';

        this._map.split('\r\n').forEach((mapBit: string) => {
            if (mapBit === '') {
                return;
            }

            heightMap += mapBit;
            heightMap += String.fromCharCode(13);
        });

        return heightMap;
    }

    public serializeRelativeHeightmap(): RelativeHeightMapComposer {
        const msg = new RelativeHeightMapComposer();

        const tmpHeightmap: string[] = this._map.split(String.fromCharCode(13));

        for (let y = 0; y < this._mapSizeY; y++) {
            if (y > 0) {
                tmpHeightmap[y] = tmpHeightmap[y].substring(1);
            }

            for (let x = 0; x < this._mapSizeX; x++) {
                let Square = tmpHeightmap[y]
                    .substring(x, x + 1)
                    .trim()
                    .toLowerCase();

                if (this._doorX == x && this._doorY == y) {
                    Square = this._doorZ.toString();
                }

                msg.writeString(Square);
            }
            msg.writeString(String.fromCharCode(13));
        }

        return msg;
    }

    public get name(): string {
        return this._name;
    }
}

import { GameClient } from '../../client';
import { IncomingHeaders } from '../../packets/util';
import { Handler } from '../Handler';

export class RoomHandler extends Handler {
    constructor() {
        super();

        this.addListener(
            IncomingHeaders.OPEN_FLAT_CONNECTION,
            this.onOpenFlatConnection.bind(this),
        );
    }

    public async onOpenFlatConnection(event, client: GameClient) {}
}

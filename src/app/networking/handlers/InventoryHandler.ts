import { GameClient } from '../client';
import { GetCreditsInfoEvent } from '../packets';
import { IncomingHeaders } from '../packets/util';
import { Handler } from './Handler';

export class InventoryHandler extends Handler {
    constructor() {
        super();

        this.addListener(
            IncomingHeaders.GET_CREDITS,
            this.onGetCredits.bind(this),
        );
    }

    public async onGetCredits(
        event: GetCreditsInfoEvent,
        client: GameClient,
    ): Promise<void> {
        if (!client.habbo) return;

        client.habbo.updateCredits();
        client.habbo.updatePixels();
    }
}

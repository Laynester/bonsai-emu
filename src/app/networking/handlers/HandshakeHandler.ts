import { GameClient } from '../../';
import { GetTexts } from '../../../api';
import { Habbo } from '../../../hotel';
import { HabboManager } from '../../../hotel/habbo/HabboManager';
import {
    AuthenticationOKComposer,
    AvailabilityStatusComposer,
    InfoFeedEnableComposer,
    InfoRetrieveMessageEvent,
    InitCryptoComposer,
    InitCryptoMessageEvent,
    SessionParamsComposer,
    SSOTicketMessageEvent,
    UniqueIdComposer,
    UserRightsComposer,
} from '../../networking/packets';
import { IncomingHeaders } from '../packets/util';
import { Handler } from './Handler';

export class HandshakeHandler extends Handler {
    constructor() {
        super();

        this.addListener(
            IncomingHeaders.INIT_CRYPTO,
            this.onInitCrypto.bind(this),
        );

        this.addListener(
            IncomingHeaders.SSO_TICKET,
            this.onSSOTicket.bind(this),
        );

        this.addListener(
            IncomingHeaders.INFO_RETRIEVE,
            this.onInfoRetrieve.bind(this),
        );
    }

    private onInitCrypto(event: InitCryptoMessageEvent, client: GameClient) {
        client.sendResponse(new InitCryptoComposer());
        client.sendResponse(new SessionParamsComposer());
    }

    private async onSSOTicket(
        event: SSOTicketMessageEvent,
        client: GameClient,
    ) {
        const ticket = event.ticket;

        console.log(ticket);

        if (!ticket) return client.disconnect();

        const habbo: Habbo = await HabboManager.tryLogin(ticket);

        if (!habbo)
            return client.disconnect(
                GetTexts()
                    .getString('server.clients.invalid_ticket')
                    .replace('%ip%', client.socket.localAddress)
                    .replace('%sso%', ticket),
            );

        habbo.client = client;
        client.habbo = habbo;

        client.sendResponse(new UserRightsComposer());
        client.sendResponse(new UniqueIdComposer());
        client.sendResponse(new InfoFeedEnableComposer(true));
        client.sendResponse(new AvailabilityStatusComposer());
        client.sendResponse(new AuthenticationOKComposer());
    }

    public async onInfoRetrieve(
        event: InfoRetrieveMessageEvent,
        client: GameClient,
    ) {
        if (!client) return;

        if (!client.habbo) return;

        client.habbo.serializeObject();
    }
}

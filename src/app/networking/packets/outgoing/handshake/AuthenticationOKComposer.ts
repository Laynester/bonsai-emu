import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class AuthenticationOKComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.AUTH_OK);
    }
}

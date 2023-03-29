import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class HabboBroadcastComposer extends OutgoingMessage {
    constructor(message: string) {
        super(OutgoingHeaders.HABBO_BROADCAST);
        this.writeString(message);
    }
}

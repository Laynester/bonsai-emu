import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class SessionParamsComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.SESSION_PARAMS);
        this.writeInt(9);
        this.writeInt(0);
        this.writeInt(1);
        this.writeInt(1);
        this.writeInt(3);
        this.writeInt(0);
        this.writeInt(2);
        this.writeInt(1);
        this.writeInt(4);
        this.writeInt(0);
        this.writeInt(5);
        this.writeStringBreak('dd-mm-yyy');
        this.writeInt(7);
        this.writeBoolean(false);
        this.writeInt(8);
        this.writeStringBreak('/client');
        this.writeInt(9);
        this.writeBoolean(false);
    }
}

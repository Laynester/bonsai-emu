import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class ModMessageComposer extends OutgoingMessage {
    constructor(message: string) {
        super(OutgoingHeaders.MOD_MESSAGE);
        this.writeString(message);
    }
}

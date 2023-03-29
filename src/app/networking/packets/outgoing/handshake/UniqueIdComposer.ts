import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class UniqueIdComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.UNIQUE_ID_MESSAGE);
        this.writeString('uuid-ssmthm');
    }
}

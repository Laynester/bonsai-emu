import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class AvailabilityStatusComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.AVAILABILITY_STATUS);
        this.writeBoolean(true);
        this.writeBoolean(false);
    }
}

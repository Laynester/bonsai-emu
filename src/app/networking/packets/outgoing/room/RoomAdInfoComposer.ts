import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class RoomAdInfoComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.ROOM_AD_INFO);
        this.writeInt(-1);
    }
}

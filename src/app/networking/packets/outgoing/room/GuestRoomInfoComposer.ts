import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class GuestRoomInfoComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.GUEST_ROOM_INFO);
        this.writeInt(0);
    }
}

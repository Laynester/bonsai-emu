import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class RoomReadyComposer extends OutgoingMessage {
    constructor(model = '', name = '', category = -1) {
        super(OutgoingHeaders.ROOM_READY);
        this.writeString(model);
        this.writeString(name);
        this.writeInt(category);
    }
}

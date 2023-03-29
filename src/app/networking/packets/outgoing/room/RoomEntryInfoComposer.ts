import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class RoomEntryInfoComposer extends OutgoingMessage {
    constructor(idOrData: number | string, rights = false, guest = true) {
        super(OutgoingHeaders.ROOM_ENTRY_INFO);

        this.writeBoolean(guest);

        if (guest) {
            this.writeInt(parseInt(idOrData.toString()));
            this.writeBoolean(rights);
        }
    }
}

import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class RoomPropertyComposer extends OutgoingMessage {
    constructor(data: string, type = 'wallpaper') {
        super(OutgoingHeaders.ROOM_PROPERTY);
        this.writeString(type);
        this.writeStringBreak(data);
    }
}

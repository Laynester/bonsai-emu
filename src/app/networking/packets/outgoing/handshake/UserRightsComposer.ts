import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class UserRightsComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.USER_RIGHTS);
        this.writeInt(0);
    }
}

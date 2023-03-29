import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class FurnitureAliasesComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.FURNITURE_ALIASES);
        this.writeInt(0);
    }
}

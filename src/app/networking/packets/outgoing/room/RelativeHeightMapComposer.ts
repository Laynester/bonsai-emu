import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class RelativeHeightMapComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.RELATIVE_HEIGHT_MAP);
    }
}

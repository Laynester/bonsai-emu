import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class HeightMapComposer extends OutgoingMessage {
    constructor(map: string) {
        super(OutgoingHeaders.HEIGHT_MAP);
        this.writeString(map);
    }
}

import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class InitCryptoComposer extends OutgoingMessage {
    constructor() {
        super(OutgoingHeaders.INIT_CRYPTO);

        this.writeString('12345678901234567890123456789012');

        this.writeInt(0);
    }
}

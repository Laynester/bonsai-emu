import { OutgoingHeaders } from '../../../util';
import { OutgoingMessage } from '../../OutgoingMessage';

export class CreditBalanceComposer extends OutgoingMessage {
    constructor(balance: number) {
        super(OutgoingHeaders.CREDIT_BALANCE);
        this.writeString(balance.toString() + '.0');
    }
}

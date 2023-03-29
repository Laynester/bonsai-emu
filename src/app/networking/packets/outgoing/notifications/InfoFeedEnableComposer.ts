import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class InfoFeedEnableComposer extends OutgoingMessage {
    constructor(enabled: boolean) {
        super(OutgoingHeaders.INFO_FEED_ENABLE);
        this.writeBoolean(enabled);
    }
}

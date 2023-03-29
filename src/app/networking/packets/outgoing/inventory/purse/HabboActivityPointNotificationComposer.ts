import { OutgoingHeaders } from '../../../util';
import { OutgoingMessage } from '../../OutgoingMessage';

export class HabboActivityPointNotificationComposer extends OutgoingMessage {
    constructor(balance: number, pointsToNotify = 0) {
        super(OutgoingHeaders.ACTIVITY_POINT_NOTIFICATION);
        this.writeInt(balance);
        this.writeInt(pointsToNotify);
    }
}

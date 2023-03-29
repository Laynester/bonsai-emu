import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class NavigatorSettingsComposer extends OutgoingMessage {
    constructor(homeRoom: number) {
        super(OutgoingHeaders.NAVIGATOR_SETTINGS);

        this.writeInt(homeRoom);
    }
}

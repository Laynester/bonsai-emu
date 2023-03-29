import { OutgoingHeaders } from '../../util';
import { OutgoingMessage } from '../OutgoingMessage';

export class UserObjectComposer extends OutgoingMessage {
    constructor(
        id = -1,
        name = '',
        figure = '',
        sex = 'M',
        respectsTotal = 3,
        respectsLeft = 3,
        petRespectsLeft = 3,
        customData = '',
        realName = '',
    ) {
        super(OutgoingHeaders.USER_OBJECT);

        this.writeStringBreak(id.toString());
        this.writeStringBreak(name);
        this.writeStringBreak(figure);
        this.writeStringBreak(sex);
        this.writeStringBreak(customData);
        this.writeStringBreak(realName);
        this.writeInt(0); // tickets
        this.writeStringBreak(''); // pool figure
        this.writeInt(0); // photo film
        this.writeInt(0); // direct mail
        this.writeInt(respectsTotal);
        this.writeInt(respectsLeft);
        this.writeInt(petRespectsLeft);
        this.writeInt(id);
    }
}

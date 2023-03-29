import { Base64Encoding } from '../util/Base64Encoding';
import { VL64Encoding } from '../util/VL64Encoding';

export class OutgoingMessage {
    private mMessageId: number;
    private mBody: Array<number>;
    private textEncoder: TextEncoder = new TextEncoder();

    constructor(messageId: number) {
        this.mMessageId = messageId;
        this.mBody = new Array<number>();
    }

    public writeString(obj: string): void {
        if (obj == null) {
            obj = '';
        }

        this.appendBytes(Array.from(this.textEncoder.encode(obj)));
    }

    public writeStringBreak(obj: string, breakCode = 2) {
        this.writeString(obj);
        this.appendByte(breakCode);
    }

    public writeInt(number: number): void {
        this.appendBytes(Array.from(VL64Encoding.encode(number)));
    }

    public writeBoolean(obj: boolean): void {
        this.writeInt(obj ? 1 : 0);
    }

    //

    private appendByte(b: number): void {
        this.mBody.push(b);
    }

    private appendBytes(data: Array<number>): void {
        if (!data || data.length === 0) {
            return;
        }

        this.mBody.push(...data);
    }

    //

    public get id(): number {
        return this.mMessageId;
    }

    public get headerString(): string {
        const header: Uint8Array = Base64Encoding.encode(this.mMessageId, 2);
        return new TextDecoder().decode(header);
    }

    public get length(): number {
        return this.mBody.length;
    }

    public toString(): string {
        const headerString: string = this.headerString;
        const bodyString: string = new TextDecoder().decode(
            Uint8Array.from(this.mBody),
        );
        return headerString + bodyString;
    }

    public bodyToString(): string {
        return new TextDecoder().decode(Uint8Array.from(this.mBody));
    }

    public clearBody(): void {
        this.mBody = new Array<number>();
    }

    public getBytes(): Uint8Array {
        const Data: Uint8Array = new Uint8Array(this.length + 7);
        const Header: Uint8Array = Base64Encoding.encode(this.mMessageId, 2);

        Data[0] = 1;
        Data[1] = 1;
        Data[2] = 1;
        Data[3] = Header[0];
        Data[4] = Header[1];

        for (let i = 0; i < this.length; i++) {
            Data[i + 5] = this.mBody[i];
        }

        Data[Data.length - 1] = 1;

        return Data;
    }
}

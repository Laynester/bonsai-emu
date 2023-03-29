/* eslint-disable prefer-spread */
import { Base64Encoding } from '../util/Base64Encoding';
import { VL64Encoding } from '../util/VL64Encoding';

export class IncomingMessage {
    private buffer: Buffer;
    private header: string;
    private headerId: number;

    public init(data: Buffer): IncomingMessage {
        this.buffer = data;
        this.readBytes(3);
        this.headerId = Base64Encoding.decode(this.readBytes(2));
        this.header = Base64Encoding.encode(this.headerId, 2).toString();

        this.parse();

        return this;
    }

    public readInt(): number {
        try {
            const remaining = this.remainingBytes();

            const length = (remaining.readUInt8(0) >> 3) & 7;
            const value = VL64Encoding.decode(remaining);
            this.readBytes(length);

            return value;
        } catch (ex) {
            // throw new MalformedPacketException(
            //     'The packet sent to the server was malformed.',
            // );
        }
    }

    public readBase64(): number {
        try {
            return Base64Encoding.decode(this.readBytes(2));
        } catch (ex) {
            // throw new MalformedPacketException(
            //     'The packet sent to the server was malformed.',
            // );
        }
    }

    public readBoolean(): boolean {
        try {
            return this.readInt() === 1;
        } catch (ex) {
            // throw new MalformedPacketException(
            //     'The packet sent to the server was malformed.',
            // );
        }
    }

    public readString(): string {
        try {
            const length = this.readBase64();
            const data = this.readBytes(length);

            return data.toString('utf-8');
        } catch (ex) {
            // throw new MalformedPacketException(
            //     'The packet sent to the server was malformed.',
            // );
        }
    }

    public readClientString(): string {
        try {
            const data = this.remainingBytes();

            let position = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i] === 2) {
                    break;
                }

                position = i;
            }

            const readData = this.readBytes(position + 1).toString();
            this.readBytes(1);
            return readData;
        } catch (ex) {
            //throw new MalformedPacketException('The packet sent to the server was malformed.');
        }
    }

    public readBytes(len: number): Buffer {
        try {
            const payload = this.buffer.slice(0, len);
            this.buffer = this.buffer.slice(len);
            return payload;
        } catch (ex) {
            //throw new MalformedPacketException('The packet sent to the server was malformed.');
        }
    }

    public remainingBytes(): Buffer {
        try {
            const bytes = this.buffer;
            this.buffer = Buffer.alloc(0);
            return bytes;
        } catch (ex) {
            //throw new MalformedPacketException('The packet
        }
    }

    public contents(): string {
        try {
            const remiainingBytes: Uint8Array = this.remainingBytes();

            if (remiainingBytes != null) {
                return String.fromCharCode.apply(String, remiainingBytes);
            }

            return null;
        } catch (ex) {
            //throw new MalformedPacketException("The packet sent to the server was malformed.");
        }
    }

    public getMessageBody(): string {
        const consoleText = this.buffer.toString('utf-8');

        let str = consoleText;

        for (let i = 0; i < 14; i++) {
            str = str.replace(i.toString(), `[${i}]`);
        }

        return `[${this.headerId}] ` + this.header + str;
    }

    public getHeader(): string {
        return this.header;
    }

    public getHeaderId(): number {
        return this.headerId;
    }

    public parse(): void {
        //
    }
}

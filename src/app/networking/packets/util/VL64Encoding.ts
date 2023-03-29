export class VL64Encoding {
    public static NEGATIVE = 72;
    public static POSITIVE = 73;
    public static MAX_INTEGER_BYTE_AMOUNT = 6;

    public static encode(i: number): Uint8Array {
        const wf: Uint8Array = new Uint8Array(
            VL64Encoding.MAX_INTEGER_BYTE_AMOUNT,
        );

        let pos = 0;
        let numBytes = 1;
        const startPos: number = pos;
        const negativeMask: number = i >= 0 ? 0 : 4;

        i = Math.abs(i);

        wf[pos++] = 64 + (i & 3);

        for (i >>= 2; i != 0; i >>= VL64Encoding.MAX_INTEGER_BYTE_AMOUNT) {
            numBytes++;
            wf[pos++] = 64 + (i & 0x3f);
        }
        wf[startPos] = wf[startPos] | (numBytes << 3) | negativeMask;

        const bzData: Uint8Array = wf.subarray(0, numBytes);
        return bzData;
    }

    public static decode(bzData: Uint8Array): number {
        let pos = 0;
        let v = 0;

        const negative: boolean = (bzData[pos] & 4) == 4;
        const totalBytes: number = (bzData[pos] >> 3) & 7;

        v = bzData[pos] & 3;

        pos++;

        let shiftAmount = 2;

        for (let b = 1; b < totalBytes; b++) {
            v |= (bzData[pos] & 0x3f) << shiftAmount;
            shiftAmount = 2 + 6 * b;
            pos++;
        }

        if (negative) {
            v *= -1;
        }

        return v;
    }
}

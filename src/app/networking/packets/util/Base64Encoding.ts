export class Base64Encoding {
    public static readonly NEGATIVE: number = 64;
    public static readonly POSITIVE: number = 65;

    public static encode(i: number, numBytes: number): Uint8Array {
        const bzRes = new Uint8Array(numBytes);

        for (let j = 1; j <= numBytes; j++) {
            const k = (numBytes - j) * 6;
            bzRes[j - 1] = 0x40 + ((i >> k) & 0x3f);
        }

        return bzRes;
    }

    public static decode(bzData: Uint8Array): number {
        let i = 0;
        let j = 0;

        for (let k = bzData.length - 1; k >= 0; k--) {
            const x = bzData[k] - 0x40;

            if (j > 0) {
                i += x * Math.pow(64, j);
            } else {
                i += x;
            }

            j++;
        }

        return Math.sqrt(Math.pow(i, 2));
    }
}

import * as chalk from 'chalk';
import * as moment from 'moment';
import * as pkg from '../../package.json';

export class Logger {
    private static LAST_TIMESTAMP: number = Date.now();

    private _name: string;
    private _description: string | number;
    private _print: boolean;
    private maxChar = 27;
    private colour: chalk.ChalkFunction;

    constructor(
        name: string,
        description: string | number = null,
        colour: chalk.ChalkFunction = chalk.cyan,
    ) {
        this._name = name;
        this._description = description;
        this._print = true;
        this.colour = colour;
    }

    public log(message: any): void {
        this.printMessage(message, chalk.green);
    }

    public error(message: any, trace: any = null): void {
        this.printMessage(trace || message, chalk.red);
    }

    public warn(message: any): void {
        this.printMessage(message, chalk.yellow);
    }

    public debug(message: any): void {
        const temp = this._description;
        this._description = `DEBUG`;
        this.printMessage(`${message}`, chalk.yellowBright);
        this._description = temp;
    }

    private printMessage(message: any, color: chalk.Chalk = null): void {
        if (!this._print) return;

        const time = moment().format('H:mm:ss');
        const name = ` [${this._name}] `;

        process.stdout.write(time);

        const length = time.length + (this._name ? name.length : 0);

        for (let i = 0; i < this.maxChar - length; i++) {
            process.stdout.write(' ');
        }

        if (this._name !== null) process.stdout.write(this.colour(name));

        if (this._description !== null)
            process.stdout.write(chalk.gray(`[${this._description}] `));

        process.stdout.write(color(message));

        this.printTimestamp();

        process.stdout.write(`\n`);
    }

    private printTimestamp(): void {
        const now = Date.now();

        process.stdout.write(
            chalk.gray(` +${now - Logger.LAST_TIMESTAMP || 0}ms`),
        );

        Logger.LAST_TIMESTAMP = now;
    }

    public get description(): string | number {
        return this._description;
    }

    public set description(description: string | number) {
        this._description = description;
    }

    public get print(): boolean {
        return this._print;
    }

    public set print(flag: boolean) {
        this._print = flag;
    }

    public get logo() {
        const ver = pkg.version;
        console.log(`
8                                8eee8               
8                                8             
8eeee   eee   eee   eee8  eee  " 8eee8  ee ee  8   8
8    8 8   8 8   8 8,,,  8   8 8 8"""" 8  8  8 8   8 
8    8 8   8 8   8  """e 8eee8 8 8     8  8  8 8   8 
8eeee   eee  8   8 8eee  8   8 8 8eee8 8  8  8  eee  `);
        console.log(
            chalk.green('---------------------------------------------- ') +
                chalk.yellow(ver),
        );

        return null;
    }
}

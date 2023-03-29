import { join } from 'path';
import { DataSource } from 'typeorm';
import { GetConfig } from '../../api/app';
import { Logger } from '../../common';

export class DatabaseManager {
    private _entities: any[] = [];
    private _manager: DataSource;
    private LOGGER: Logger = new Logger(this.constructor.name);

    constructor() {
        this.initEntities();
    }

    private initEntities(): void {
        this._entities.push(join(__dirname, '/entities/*Entity.ts'));
    }

    public async init(): Promise<void> {
        this.LOGGER.log(`Attempting to connect...`);

        try {
            this._manager = new DataSource({
                type: 'mysql',
                host: GetConfig().getString('db_host', 'localhost'),
                port: GetConfig().getInt('db_port', 3306),
                username: GetConfig().getString('db_username'),
                password: GetConfig().getString('db_password'),
                database: GetConfig().getString('db_name'),
                synchronize: GetConfig().getBoolean('first_sync'),
                entities: Object.values(this._entities),
                subscribers: [],
                migrations: [],
                logging: false,
            });

            await this._manager.initialize();

            this.LOGGER.log(`Connected!`);
        } catch (error) {
            console.log(error);
            throw 'Database Failed to connect';
        }
    }
}

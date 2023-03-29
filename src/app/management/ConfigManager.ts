import { Logger } from '../../common';
import { ConfigDao } from '../database';

export class ConfigManager {
    private LOGGER: Logger = new Logger(this.constructor.name);

    private config: Map<string, string> = new Map();

    public loadConfig() {
        this.config.set('tcp_port', process.env.tcp_port);
        this.config.set('first_sync', process.env.first_sync);
        this.config.set('db_host', process.env.db_host);
        this.config.set('db_port', process.env.db_port);
        this.config.set('db_username', process.env.db_username);
        this.config.set('db_password', process.env.db_password);
        this.config.set('db_name', process.env.db_name);
    }

    public async loadFromDatabase() {
        const entities = await ConfigDao.loadConfig();

        entities.forEach((entity) => this.config.set(entity.key, entity.value));

        this.LOGGER.log(`${this.config.size} keys found!`);
    }

    public getInt(key: string, defaultValue = 0): number {
        if (this.config.get(key)) return parseInt(this.config.get(key));
        return defaultValue;
    }

    public getDouble(key: string, defaultValue = 0): number {
        if (this.config.get(key)) return parseFloat(this.config.get(key));
        return defaultValue;
    }

    public getString(key: string, defaultValue = ''): string {
        if (this.config.get(key)) return this.config.get(key);

        return defaultValue;
    }

    public getBoolean(key: string, defaultValue = false): boolean {
        if (
            this.config.get(key) &&
            (this.config.get(key) == '1' || this.config.get(key) == 'true')
        )
            return true;

        return defaultValue;
    }

    public async update(key: string, value: any): Promise<void> {
        if (!this.config.get(key)) return;

        this.config.set(key, value);
        if (process.env[key] !== null) process.env[key] = value;
        await ConfigDao.updateConfig(key, value);
    }
}

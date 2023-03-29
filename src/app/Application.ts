import { Logger } from '../common';
import { DatabaseManager, GameServer } from './';
import { ConfigManager, TextsManager } from './management';

export class Application {
    private static INSTANCE: Application = null;
    private LOGGER: Logger = new Logger('Mode');

    private _gameServer: GameServer;

    private _config: ConfigManager;
    private _databaseManager: DatabaseManager;
    private _texts: TextsManager;

    constructor() {
        Application.INSTANCE = this;

        console.clear();

        this.LOGGER.logo;
        console.log();

        this._gameServer = new GameServer();
        this._config = new ConfigManager();
        this._databaseManager = new DatabaseManager();
        this._texts = new TextsManager();

        this.init();
    }

    private async init(): Promise<void> {
        (await import('dotenv')).config();

        this._config.loadConfig();

        await this._databaseManager.init();

        await this._texts.loadFromDatabase();

        await this._config.loadFromDatabase();

        await this._gameServer.init();
    }

    public async onServerListening() {
        // load other shit here
    }

    public static get instance(): Application {
        return this.INSTANCE;
    }

    public get gameServer(): GameServer {
        return this._gameServer;
    }

    public get config(): ConfigManager {
        return this._config;
    }

    public get texts(): TextsManager {
        return this._texts;
    }

    public get database(): DatabaseManager {
        return this._databaseManager;
    }
}

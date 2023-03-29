import { Logger } from '../common';
import { HabboManager, RoomManager } from '../hotel';
import { DatabaseManager, GameServer } from './';
import { ConfigManager, TextsManager } from './management';

export class Application {
    private static INSTANCE: Application = null;
    private LOGGER: Logger = new Logger('Mode');

    private _gameServer: GameServer;

    private _config: ConfigManager;
    private _databaseManager: DatabaseManager;
    private _texts: TextsManager;
    private _habboManager: HabboManager;
    private _roomManager: RoomManager;

    constructor() {
        Application.INSTANCE = this;

        console.clear();

        this.LOGGER.logo;
        console.log();

        this._gameServer = new GameServer();
        this._config = new ConfigManager();
        this._databaseManager = new DatabaseManager();
        this._texts = new TextsManager();
        this._habboManager = new HabboManager();
        this._roomManager = new RoomManager();

        this.init();
    }

    private async init(): Promise<void> {
        (await import('dotenv')).config();

        this._config.loadConfig();

        await this._databaseManager.init();

        await this._texts.loadFromDatabase();

        await this._config.loadFromDatabase();

        await this._gameServer.init();

        await this._roomManager.init();
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

    public get habbos(): HabboManager {
        return this._habboManager;
    }

    public get rooms(): RoomManager {
        return this._roomManager;
    }
}

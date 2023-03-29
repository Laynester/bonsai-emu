import { createServer, Server, Socket } from 'net';
import { GameClientManager } from '../';
import { GetApp, GetConfig } from '../../../api';
import { PacketManager } from '../packets';

export class GameServer {
    private _clientManager: GameClientManager;
    private _packetManager: PacketManager;

    constructor() {
        this._clientManager = new GameClientManager();
        this._packetManager = new PacketManager();
    }

    public async init(): Promise<void> {
        const socket = createServer();

        const server: Server = socket.listen(GetConfig().getInt('tcp_port'));

        socket.on('listening', this.onListening.bind(this));

        server.on('connection', this.onConnection.bind(this));

        socket.on('close', this.onClose.bind(this));

        socket.on('error', this.onError.bind(this));
    }

    private onListening(): void {
        GetApp().onServerListening();
    }

    private onClose(): void {
        //
    }

    private onError(): void {
        //
    }

    private onConnection(socket: Socket): void {
        this._clientManager.addClient(socket);

        console.log('connected or wtv');
    }

    public get clientManager(): GameClientManager {
        return this._clientManager;
    }

    public get packetManager(): PacketManager {
        return this._packetManager;
    }
}

import { Socket } from 'net';
import { GameClient } from './GameClient';

export class GameClientManager {
    private clients: Map<number, GameClient>;

    constructor() {
        this.clients = new Map<number, GameClient>();
    }

    public addClient(socket: Socket): GameClient {
        const id: number = this.getNewId();

        const gc: GameClient = new GameClient(id, socket);

        this.clients.set(id, gc);

        return gc;
    }

    public removeClient(id: number): void {
        this.clients.delete(id);
    }

    public getNewId(): number {
        return this.clients.size + 1;
    }
}

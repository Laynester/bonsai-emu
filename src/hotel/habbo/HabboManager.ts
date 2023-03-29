import { GetTexts } from '../../api';
import { HabboDao, HabboEntity } from '../../app';
import { Habbo } from './Habbo';

export class HabboManager {
    private habbos: Map<number, Habbo>;

    constructor() {
        this.habbos = new Map();
    }

    public async tryLogin(sso: string): Promise<Habbo> {
        const habboEntity: HabboEntity = await HabboDao.getHabboBySSO(sso);

        if (!habboEntity) return null;

        const habbo = new Habbo(habboEntity);

        return habbo;
    }

    public addHabbo(habbo: Habbo): void {
        const habboExist = this.habbos.get(habbo.id) || null;

        if (habboExist !== null)
            habboExist.client.disconnect(
                GetTexts().getString('habbo.disconnected.elsewhere'),
                false,
            );

        this.habbos.set(habbo.id, habbo);
    }

    public removeHabbo(habbo: Habbo) {
        this.habbos.delete(habbo.id);
    }
}

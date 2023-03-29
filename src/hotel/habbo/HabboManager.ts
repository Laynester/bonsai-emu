import { HabboDao, HabboEntity } from '../../app';
import { Habbo } from './Habbo';

export class HabboManager {
    public static async tryLogin(sso: string): Promise<Habbo> {
        const habboEntity: HabboEntity = await HabboDao.getHabboBySSO(sso);

        if (!habboEntity) return null;

        const habbo = new Habbo(habboEntity);

        return habbo;
    }
}

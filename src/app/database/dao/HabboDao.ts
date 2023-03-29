import { HabboEntity } from '../entities';

export class HabboDao {
    public static async getHabboBySSO(sso: string): Promise<HabboEntity> {
        return HabboEntity.createQueryBuilder('habbo')
            .where('habbo.auth_ticket = :ticket', { ticket: sso })
            .getOne();
    }
}

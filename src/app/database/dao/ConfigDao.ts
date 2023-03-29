import { ConfigEntity } from '../entities';

export class ConfigDao {
    public static async loadConfig(): Promise<ConfigEntity[]> {
        return await ConfigEntity.createQueryBuilder('config').getMany();
    }

    public static async updateConfig(
        key: string,
        value: string,
    ): Promise<void> {
        await ConfigEntity.createQueryBuilder()
            .update({ value: value })
            .where({ key: key })
            .execute();
    }
}

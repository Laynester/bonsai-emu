import { ConfigEntity, TextsEntity } from '../entities';

export class TextsDao {
    public static async loadTexts(): Promise<ConfigEntity[]> {
        return await TextsEntity.createQueryBuilder('texts').getMany();
    }

    public static async updateText(key: string, value: string): Promise<void> {
        await ConfigEntity.createQueryBuilder()
            .update({ value: value })
            .where({ key: key })
            .execute();
    }
}

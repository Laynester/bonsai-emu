import { Logger } from '../../common';
import { TextsDao } from '../database/dao/TextsDao';

export class TextsManager {
    private LOGGER: Logger = new Logger(this.constructor.name);

    private texts: Map<string, string> = new Map();

    public async loadFromDatabase() {
        const entities = await TextsDao.loadTexts();

        entities.forEach((entity) => this.texts.set(entity.key, entity.value));

        this.LOGGER.log(`${this.texts.size} keys found!`);
    }

    public getString(key: string, defaultValue = ''): string {
        if (this.texts.get(key)) return this.texts.get(key);

        return defaultValue || key;
    }

    public async update(key: string, value: any): Promise<void> {
        if (!this.texts.get(key)) return;

        this.texts.set(key, value);
        await TextsDao.updateText(key, value);
    }
}

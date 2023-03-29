import { Application, TextsManager } from '../../app';

export const GetTexts = (): TextsManager => Application.instance.texts;

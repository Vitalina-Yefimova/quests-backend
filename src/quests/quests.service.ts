import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quest } from './quest.schema';
import { CreateQuest } from './interfaces/create-quest.interface';
import { QuestDocument } from './interfaces/quest-document.interface';

@Injectable()
export class QuestsService {
  constructor(@InjectModel(Quest.name) private questModel: Model<QuestDocument>) { }

  async insertMany(quests: CreateQuest[]): Promise<QuestDocument[]> {
    return this.questModel.insertMany(quests);
  }

  async findAll(): Promise<QuestDocument[]> {
    return this.questModel.find().exec();
  }
}

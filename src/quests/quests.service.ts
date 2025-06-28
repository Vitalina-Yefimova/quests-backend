import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quests } from '../mongo-schemas/quests.schema';
import { QuestsRequest, QuestsDocument } from './interfaces';

@Injectable()
export class QuestsService {
  constructor(@InjectModel(Quests.name) private questsModel: Model<QuestsDocument>) { }

  async insertMany(quests: QuestsRequest[]): Promise<QuestsDocument[]> {
    return this.questsModel.insertMany(quests);
  }

  async findAll(): Promise<QuestsDocument[]> {
    return this.questsModel.find().exec();
  }

  async findOne(id: string): Promise<QuestsDocument | null> {
    return this.questsModel.findById(id).exec();
  }

}

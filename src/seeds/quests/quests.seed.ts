import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { questsData } from './questsData';
import { QuestsSchema } from '@/mongo-schemas/quests.schema';

dotenv.config();

const QuestsModel = mongoose.model('Quests', QuestsSchema)
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    await QuestsModel.deleteMany({});
    await QuestsModel.insertMany(questsData);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();


import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { questsData } from '../quests/questsData';
import { QuestsSchema } from '../../mongo-schemas/quests.schema';

dotenv.config();

const QuestsModel = mongoose.model('Quests', QuestsSchema)
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    await QuestsModel.deleteMany({});
    await QuestsModel.insertMany(questsData);
    console.log('Quests seeding completed!');
  } catch (err) {
    console.error('Quests seeding failed:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();


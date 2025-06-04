import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { questsData } from './questsData';
import { QuestSchema } from '../quest.schema';

dotenv.config();

const QuestModel = mongoose.model('Quest', QuestSchema)
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB Atlas');

    await QuestModel.deleteMany({});
    await QuestModel.insertMany(questsData);
    console.log('Quests inserted successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();


import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Quest } from '../quest.schema';
import { questsData } from './questsData';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB Atlas');

    // Drop the collection to remove all indexes
    await mongoose.connection.dropCollection('quests').catch(() => {
      console.log('Collection does not exist, creating new one');
    });

    await Quest.insertMany(questsData);
    console.log('Quests inserted successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();


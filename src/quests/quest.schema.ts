import { Schema, model } from 'mongoose';
import { QuestDocument } from './interfaces/quest-document.interface';


const QuestSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: {
    type: [{ genreName: { type: String, required: true } }],
    required: true,
  },
  difficulty: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  imageBg: { type: String, required: true },
});


QuestSchema.index({ 'genres.genreName': 1 });

export const Quest = model<QuestDocument>('Quest', QuestSchema);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quest {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop({
    type: [{ genreName: { type: String, required: true } }],
    required: true,
  })
  genres: { genreName: string }[];
  @Prop({ required: true }) players: string;
  @Prop({ required: true }) difficulty: string;
  @Prop({ required: true }) duration: string;
  @Prop({ required: true }) price: number;
  @Prop({ required: true }) image: string;
  @Prop({ required: true }) imageBg: string;
}

export type QuestDocument = Quest & Document;

export const QuestSchema = SchemaFactory.createForClass(Quest);

QuestSchema.index({ 'genres.genreName': 1 });

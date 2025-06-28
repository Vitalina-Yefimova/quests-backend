import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quests {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop({
    type: [{ genreName: { type: String, required: true } }],
    required: true,
  })
  genres: { genreName: string }[];
  @Prop(
    raw({
      min: { type: Number, required: true, min: 2, max: 8 },
      max: { type: Number, required: true, min: 2, max: 8 },
    }),
  )
  players: {
    min: number;
    max: number;
  };
  @Prop({ required: true }) difficulty: string;
  @Prop({ required: true }) duration: string;
  @Prop({ required: true }) price: number;
  @Prop({ required: true }) image: string;
  @Prop({ required: true }) imageBg: string;
}

export type QuestsDocument = Quests & Document;

export const QuestsSchema = SchemaFactory.createForClass(Quests);

QuestsSchema.index({ 'genres.genreName': 1 });
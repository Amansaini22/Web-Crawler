import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { now } from 'mongoose';

export type CrawlerDocument = HydratedDocument<CrawlerSchemaClass>;

@Schema({
  collection: 'crawlers',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class CrawlerSchemaClass {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id!: Types.ObjectId;
  
  @Prop({
    type: String,
    required: true,
  })
  domain: string;

  @Prop({
    type: [String],
    required: true,
  })
  discoveredUrls: string[];

  @Prop({
    type: Boolean,
    default: false,
  })
  isActive: boolean;

  @Prop({
    type: Date,
    default: now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: now,
  })
  updatedAt: Date;

  @Prop({
    type: Date,
    default: null,
  })
  deletedAt?: Date;
}

export const CrawlerSchema = SchemaFactory.createForClass(CrawlerSchemaClass);

CrawlerSchema.index({ domain: 1 });
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BannerDocument = Banner & Document;

@Schema({ timestamps: true })
export class Banner {
    @Prop({ required: true })
    imageUrl: string;

    @Prop({ default: true })
    active: boolean;

    @Prop({ default: 0 })
    order: number;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './schemas/banner.schema';

@Injectable()
export class BannersService {
    constructor(@InjectModel(Banner.name) private bannerModel: Model<BannerDocument>) { }

    async findAll(): Promise<Banner[]> {
        return this.bannerModel.find({ active: true }).sort({ order: 1 }).exec();
    }
}

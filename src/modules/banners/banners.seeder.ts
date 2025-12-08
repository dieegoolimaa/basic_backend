import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './schemas/banner.schema';

@Injectable()
export class BannersSeeder implements OnModuleInit {
    constructor(@InjectModel(Banner.name) private bannerModel: Model<BannerDocument>) {}

    async onModuleInit() {
        await this.seedBanners();
    }

    private async seedBanners() {
        const count = await this.bannerModel.countDocuments().exec();
        if (count > 0) return;

        const banners = [
            { imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1200', order: 1 },
            { imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200', order: 2 },
            { imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=1200', order: 3 }
        ];

        await this.bannerModel.insertMany(banners);
        console.log('✅ Banners seeded');
    }
}

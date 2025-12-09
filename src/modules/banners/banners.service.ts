import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './schemas/banner.schema';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';

@Injectable()
export class BannersService {
    constructor(@InjectModel(Banner.name) private bannerModel: Model<BannerDocument>) { }

    /**
     * Get all active banners (public)
     */
    async findActive(): Promise<BannerDocument[]> {
        return this.bannerModel.find({ isActive: true }).sort({ order: 1 }).exec();
    }

    /**
     * Get all banners (admin)
     */
    async findAll(): Promise<BannerDocument[]> {
        return this.bannerModel.find().sort({ order: 1 }).exec();
    }

    /**
     * Get banner by ID
     */
    async findById(id: string): Promise<BannerDocument> {
        const banner = await this.bannerModel.findById(id).exec();
        if (!banner) throw new NotFoundException('Banner não encontrado');
        return banner;
    }

    /**
     * Create new banner
     */
    async create(createBannerDto: CreateBannerDto): Promise<BannerDocument> {
        // Get highest order and add 1
        const lastBanner = await this.bannerModel.findOne().sort({ order: -1 }).exec();
        const order = (lastBanner?.order || 0) + 1;

        const banner = new this.bannerModel({
            ...createBannerDto,
            order,
            isActive: true,
        });
        return banner.save();
    }

    /**
     * Update banner
     */
    async update(id: string, updateBannerDto: UpdateBannerDto): Promise<BannerDocument> {
        const banner = await this.bannerModel.findByIdAndUpdate(
            id,
            { $set: updateBannerDto },
            { new: true }
        ).exec();

        if (!banner) throw new NotFoundException('Banner não encontrado');
        return banner;
    }

    /**
     * Delete banner
     */
    async delete(id: string): Promise<void> {
        const result = await this.bannerModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Banner não encontrado');
    }

    /**
     * Toggle banner status
     */
    async toggleStatus(id: string): Promise<BannerDocument> {
        const banner = await this.findById(id);
        banner.isActive = !banner.isActive;
        return banner.save();
    }
}

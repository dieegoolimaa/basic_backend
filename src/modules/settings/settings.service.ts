import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SiteSettings, SiteSettingsDocument } from './schemas/site-settings.schema';
import { UpdateSiteSettingsDto } from './dto/site-settings.dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(SiteSettings.name) private settingsModel: Model<SiteSettingsDocument>,
    ) { }

    /**
     * Get current site settings (creates default if not exists)
     */
    async getSettings(): Promise<SiteSettingsDocument> {
        let settings = await this.settingsModel.findOne({ key: 'default' }).exec();

        if (!settings) {
            // Create default settings
            settings = await this.settingsModel.create({ key: 'default' });
        }

        return settings;
    }

    /**
     * Update site settings
     */
    async updateSettings(updateDto: UpdateSiteSettingsDto): Promise<SiteSettingsDocument> {
        const settings = await this.settingsModel.findOneAndUpdate(
            { key: 'default' },
            { $set: updateDto },
            { new: true, upsert: true }
        ).exec();

        return settings;
    }

    /**
     * Reset settings to defaults
     */
    async resetSettings(): Promise<SiteSettingsDocument> {
        await this.settingsModel.deleteOne({ key: 'default' }).exec();
        return this.getSettings();
    }
}

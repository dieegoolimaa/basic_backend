import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { Banner, BannerSchema } from './schemas/banner.schema';
import { BannersSeeder } from './banners.seeder';

@Module({
    imports: [MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }])],
    controllers: [BannersController],
    providers: [BannersService, BannersSeeder],
})
export class BannersModule { }

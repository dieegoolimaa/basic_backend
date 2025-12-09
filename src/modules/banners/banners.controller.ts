import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('banners')
export class BannersController {
    constructor(private readonly bannersService: BannersService) { }

    /**
     * GET /api/banners - Public: Get all active banners for the home page
     */
    @Get()
    async findActive() {
        return this.bannersService.findActive();
    }

    /**
     * GET /api/banners/admin - Admin: Get all banners including inactive
     */
    @Get('admin')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async findAll() {
        return this.bannersService.findAll();
    }

    /**
     * GET /api/banners/:id - Admin: Get single banner
     */
    @Get(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async findOne(@Param('id') id: string) {
        return this.bannersService.findById(id);
    }

    /**
     * POST /api/banners - Admin: Create new banner
     */
    @Post()
    @UseGuards(JwtAuthGuard, AdminGuard)
    async create(@Body() createBannerDto: CreateBannerDto) {
        return this.bannersService.create(createBannerDto);
    }

    /**
     * PUT /api/banners/:id - Admin: Update banner
     */
    @Put(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
        return this.bannersService.update(id, updateBannerDto);
    }

    /**
     * DELETE /api/banners/:id - Admin: Delete banner
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async delete(@Param('id') id: string) {
        await this.bannersService.delete(id);
        return { message: 'Banner removido com sucesso' };
    }

    /**
     * PUT /api/banners/:id/toggle - Admin: Toggle banner active status
     */
    @Put(':id/toggle')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async toggleStatus(@Param('id') id: string) {
        return this.bannersService.toggleStatus(id);
    }
}

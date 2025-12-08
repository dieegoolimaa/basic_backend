import { Controller, Get } from '@nestjs/common';
import { BannersService } from './banners.service';

@Controller('home-content')
export class BannersController {
    constructor(private readonly bannersService: BannersService) { }

    @Get()
    async findAll() {
        return this.bannersService.findAll();
    }
}

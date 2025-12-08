import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { Course } from './schemas/course.schema';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Get()
    async findAll() {
        return this.coursesService.findAll();
    }

    @Get('with-ratings')
    async getCoursesWithRatings() {
        return this.coursesService.getCoursesWithRatings();
    }

    @Get('admin')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async findAllAdmin() {
        return this.coursesService.findAllAdmin();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.coursesService.findById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, AdminGuard)
    async create(@Body() courseData: Partial<Course>) {
        return this.coursesService.create(courseData);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async update(@Param('id') id: string, @Body() courseData: Partial<Course>) {
        return this.coursesService.update(id, courseData);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    async delete(@Param('id') id: string) {
        return this.coursesService.delete(id);
    }
}

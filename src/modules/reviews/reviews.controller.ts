import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() req: any, @Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(req.user.userId, createReviewDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Request() req: any,
        @Param('id') id: string,
        @Body() updateReviewDto: UpdateReviewDto,
    ) {
        return this.reviewsService.update(id, req.user.userId, updateReviewDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Request() req: any, @Param('id') id: string) {
        return this.reviewsService.delete(id, req.user.userId);
    }

    @Get('course/:courseId')
    async findByCourse(@Param('courseId') courseId: string) {
        return this.reviewsService.findByCourse(courseId);
    }

    @Get('course/:courseId/stats')
    async getCourseStats(@Param('courseId') courseId: string) {
        return this.reviewsService.getCourseStats(courseId);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async findMyReviews(@Request() req: any) {
        return this.reviewsService.findByUser(req.user.userId);
    }

    @Get('me/course/:courseId')
    @UseGuards(JwtAuthGuard)
    async getMyReviewForCourse(@Request() req: any, @Param('courseId') courseId: string) {
        return this.reviewsService.getUserReviewForCourse(req.user.userId, courseId);
    }
}

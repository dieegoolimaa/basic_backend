import { Controller, Get, Param, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('students')
    @UseGuards(AdminGuard)
    async getAllStudents() {
        return this.usersService.findAllStudents();
    }

    @Get('me')
    async getProfile(@Request() req: any) {
        return this.usersService.findById(req.user.userId);
    }

    @Get('me/courses')
    async getMyCourses(@Request() req: any) {
        return this.usersService.getEnrolledCourses(req.user.userId);
    }

    @Get('me/progress')
    async getMyProgress(@Request() req: any) {
        return this.usersService.getProgress(req.user.userId);
    }

    @Put(':id/courses')
    @UseGuards(AdminGuard)
    async updateUserCourses(
        @Param('id') id: string,
        @Body('courseIds') courseIds: string[],
    ) {
        return this.usersService.updateCourses(id, courseIds);
    }

    @Put(':id/active')
    @UseGuards(AdminGuard)
    async setActiveStatus(
        @Param('id') id: string,
        @Body('isActive') isActive: boolean,
    ) {
        return this.usersService.setActiveStatus(id, isActive);
    }

    @Put('me/lessons/:lessonId/complete')
    async markLessonComplete(
        @Request() req: any,
        @Param('lessonId') lessonId: string,
    ) {
        return this.usersService.markLessonComplete(req.user.userId, lessonId);
    }

    @Put('me/courses/:courseId/progress')
    async updateProgress(
        @Request() req: any,
        @Param('courseId') courseId: string,
        @Body('progress') progress: number,
    ) {
        return this.usersService.updateCourseProgress(req.user.userId, courseId, progress);
    }
}

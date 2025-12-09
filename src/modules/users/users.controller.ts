import { Controller, Get, Param, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('students')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Get all students (Admin)', description: 'Returns list of all student users' })
    @ApiResponse({ status: 200, description: 'List of students' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async getAllStudents() {
        return this.usersService.findAllStudents();
    }

    @Get('me')
    @ApiOperation({ summary: 'Get my profile', description: 'Returns the authenticated user profile' })
    @ApiResponse({ status: 200, description: 'User profile data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getProfile(@Request() req: any) {
        return this.usersService.findById(req.user.userId);
    }

    @Get('me/courses')
    @ApiOperation({ summary: 'Get my enrolled courses', description: 'Returns all courses the user is enrolled in' })
    @ApiResponse({ status: 200, description: 'List of enrolled courses' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getMyCourses(@Request() req: any) {
        return this.usersService.getEnrolledCourses(req.user.userId);
    }

    @Get('me/progress')
    @ApiOperation({ summary: 'Get my learning progress', description: 'Returns the user learning progress across all courses' })
    @ApiResponse({ status: 200, description: 'User progress data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getMyProgress(@Request() req: any) {
        return this.usersService.getProgress(req.user.userId);
    }

    @Put('me')
    @ApiOperation({ summary: 'Update my profile', description: 'Updates the authenticated user profile' })
    @ApiResponse({ status: 200, description: 'Profile updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async updateMyProfile(@Request() req: any, @Body() updateData: any) {
        return this.usersService.update(req.user.userId, updateData);
    }

    @Get(':id')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Get user by ID (Admin)', description: 'Returns a specific user by their ID' })
    @ApiResponse({ status: 200, description: 'User data' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUserById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Update user (Admin)', description: 'Admin endpoint to update any user data' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateUser(@Param('id') id: string, @Body() updateData: any) {
        return this.usersService.update(id, updateData);
    }

    @Put(':id/courses')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Update user courses (Admin)', description: 'Admin endpoint to update which courses a user has access to' })
    @ApiResponse({ status: 200, description: 'User courses updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async updateUserCourses(
        @Param('id') id: string,
        @Body('courseIds') courseIds: string[],
    ) {
        return this.usersService.updateCourses(id, courseIds);
    }

    @Put(':id/active')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Set user active status (Admin)', description: 'Admin endpoint to activate or deactivate a user account' })
    @ApiResponse({ status: 200, description: 'User status updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async setActiveStatus(
        @Param('id') id: string,
        @Body('isActive') isActive: boolean,
    ) {
        return this.usersService.setActiveStatus(id, isActive);
    }

    @Put('me/lessons/:lessonId/complete')
    @ApiOperation({ summary: 'Mark lesson as complete', description: 'Marks a specific lesson as completed for the authenticated user' })
    @ApiResponse({ status: 200, description: 'Lesson marked as complete' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async markLessonComplete(
        @Request() req: any,
        @Param('lessonId') lessonId: string,
    ) {
        return this.usersService.markLessonComplete(req.user.userId, lessonId);
    }

    @Put('me/courses/:courseId/progress')
    @ApiOperation({ summary: 'Update course progress', description: 'Updates the progress percentage for a specific course' })
    @ApiResponse({ status: 200, description: 'Progress updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async updateProgress(
        @Request() req: any,
        @Param('courseId') courseId: string,
        @Body('progress') progress: number,
    ) {
        return this.usersService.updateCourseProgress(req.user.userId, courseId, progress);
    }
}

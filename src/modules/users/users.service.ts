import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(userData: Partial<User>): Promise<UserDocument> {
        const user = new this.userModel(userData);
        return user.save();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateData: Partial<User>): Promise<UserDocument> {
        // Remove sensitive fields that shouldn't be updated directly
        const { password, role, enrolledCourses, completedLessons, courseProgress, ...safeData } = updateData as any;

        const user = await this.userModel.findByIdAndUpdate(
            id,
            { $set: safeData },
            { new: true }
        ).exec();

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findAllStudents(): Promise<UserDocument[]> {
        return this.userModel
            .find({ role: UserRole.STUDENT })
            .populate('enrolledCourses')
            .exec();
    }

    async findAllAdmins(): Promise<UserDocument[]> {
        return this.userModel
            .find({ role: UserRole.ADMIN })
            .select('-password')
            .exec();
    }

    async createAdmin(adminData: { name: string; email: string; password: string }): Promise<UserDocument> {
        const bcrypt = await import('bcrypt');
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        const admin = new this.userModel({
            name: adminData.name,
            email: adminData.email.toLowerCase(),
            password: hashedPassword,
            role: UserRole.ADMIN,
            isActive: true,
        });
        return admin.save();
    }

    async deleteUser(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('User not found');
    }

    async enrollInCourses(userId: string, courseIds: string[]): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        const objectIds = courseIds.map(id => new Types.ObjectId(id));
        const existing = user.enrolledCourses.map(id => id.toString());
        const newCourses = objectIds.filter(id => !existing.includes(id.toString()));

        user.enrolledCourses.push(...newCourses);
        return user.save();
    }

    async updateCourses(userId: string, courseIds: string[]): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        user.enrolledCourses = courseIds.map(id => new Types.ObjectId(id));
        return user.save();
    }

    async markLessonComplete(userId: string, lessonId: string): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        if (!user.completedLessons.includes(lessonId)) {
            user.completedLessons.push(lessonId);
        }
        return user.save();
    }

    async updateCourseProgress(userId: string, courseId: string, progress: number): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        user.courseProgress.set(courseId, progress);
        return user.save();
    }

    async setActiveStatus(userId: string, isActive: boolean): Promise<UserDocument> {
        const user = await this.userModel.findByIdAndUpdate(
            userId,
            { isActive },
            { new: true },
        );
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async getEnrolledCourses(userId: string) {
        const user = await this.userModel
            .findById(userId)
            .populate('enrolledCourses')
            .exec();
        if (!user) throw new NotFoundException('User not found');
        return user.enrolledCourses;
    }

    async getProgress(userId: string) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) throw new NotFoundException('User not found');
        return {
            completedLessons: user.completedLessons,
            courseProgress: Object.fromEntries(user.courseProgress),
        };
    }
}

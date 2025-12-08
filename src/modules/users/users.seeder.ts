import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeeder implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async onModuleInit() {
        await this.seedAdmin();
    }

    private async seedAdmin() {
        const adminEmail = 'admin@basic.com';

        const existingAdmin = await this.userModel.findOne({ email: adminEmail }).exec();
        if (existingAdmin) {
            console.log('✅ Admin user already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = new this.userModel({
            name: 'Administrador',
            email: adminEmail,
            password: hashedPassword,
            role: UserRole.ADMIN,
            isActive: true,
        });

        await admin.save();
        console.log('✅ Admin user created: admin@basic.com / admin123');
    }
}

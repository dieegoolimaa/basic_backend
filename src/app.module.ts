import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { InvitesModule } from './modules/invites/invites.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { BannersModule } from './modules/banners/banners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/basic-studio',
    ),
    AuthModule,
    UsersModule,
    CoursesModule,
    ReviewsModule,
    InvitesModule,
    UploadsModule,
    BannersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

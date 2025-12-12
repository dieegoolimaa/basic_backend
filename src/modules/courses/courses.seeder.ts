import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesSeeder implements OnModuleInit {
    private readonly logger = new Logger(CoursesSeeder.name);

    constructor(
        @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    ) { }

    async onModuleInit() {
        await this.seedCourses();
    }

    private async seedCourses() {
        const count = await this.courseModel.countDocuments().exec();
        if (count > 0) {
            this.logger.log('Courses already exist');
            return;
        }

        const courses = [
            {
                title: 'Formação Completa em Nail Art',
                subtitle: 'Domine as técnicas mais avançadas',
                description: 'Aprenda do zero a criar designs incríveis de nail art com técnicas profissionais',
                instructor: 'Ana Silva',
                imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
                thumbnailUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
                isActive: true,
                modules: [
                    {
                        id: 'mod_1',
                        title: 'Módulo 1: Fundamentos',
                        lessons: [
                            {
                                id: 'les_1',
                                title: 'Bem-vinda ao Curso',
                                description: 'Introdução ao curso e materiais necessários',
                                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                duration: '10:00',
                                procedureSteps: [
                                    { step: 1, description: 'Assista ao vídeo de introdução' },
                                    { step: 2, description: 'Baixe a lista de materiais' }
                                ]
                            },
                            {
                                id: 'les_2',
                                title: 'Preparação das Unhas',
                                description: 'Como preparar as unhas antes da aplicação',
                                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                duration: '15:30',
                                procedureSteps: [
                                    { step: 1, description: 'Higienização das mãos' },
                                    { step: 2, description: 'Remoção de cutículas' },
                                    { step: 3, description: 'Lixamento técnico' }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'mod_2',
                        title: 'Módulo 2: Técnicas Básicas',
                        lessons: [
                            {
                                id: 'les_3',
                                title: 'Esmaltação Perfeita',
                                description: 'Segredos para uma esmaltação duradoura',
                                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                duration: '20:00',
                                procedureSteps: [
                                    { step: 1, description: 'Base coat' },
                                    { step: 2, description: 'Aplicação da cor' },
                                    { step: 3, description: 'Top coat' }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        for (const course of courses) {
            await this.courseModel.create(course);
        }

        this.logger.log('Courses seeded successfully');
    }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesSeeder implements OnModuleInit {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    ) { }

    async onModuleInit() {
        await this.seedCourses();
    }

    private async seedCourses() {
        const count = await this.courseModel.countDocuments().exec();
        if (count > 0) {
            console.log('✅ Courses already exist');
            return;
        }

        const courses = [
            {
                title: 'Formação Completa em Nail Art',
                description: 'Aprenda do zero a criar designs incríveis de nail art com técnicas profissionais',
                thumbnailUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
                level: 'Iniciante',
                duration: '8 horas',
                modules: [
                    {
                        title: 'Módulo 1: Fundamentos',
                        lessons: [
                            {
                                title: 'Bem-vinda ao Curso',
                                description: 'Introdução ao curso e materiais necessários',
                                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                duration: '10:00',
                                order: 1
                            },
                            {
                                title: 'Preparação das Unhas',
                                description: 'Como preparar as unhas antes da aplicação',
                                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                duration: '15:30',
                                order: 2
                            }
                        ]
                    },
                    {
                        title: 'Módulo 2: Técnicas Básicas',
                        lessons: [
                            {
                                title: 'Aplicação de Base',
                                description: 'Técnicas corretas de aplicação de base',
                                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                duration: '20:00',
                                order: 1
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Alongamento de Unhas',
                description: 'Domine as técnicas de alongamento com fibra de vidro e gel',
                thumbnailUrl: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800',
                level: 'Intermediário',
                duration: '6 horas',
                modules: [
                    {
                        title: 'Módulo 1: Introdução ao Alongamento',
                        lessons: [
                            {
                                title: 'Materiais e Ferramentas',
                                description: 'Conhecendo os materiais necessários',
                                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                duration: '12:00',
                                order: 1
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Blindagem de Unhas',
                description: 'Técnica de fortalecimento e proteção das unhas naturais',
                thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
                level: 'Iniciante',
                duration: '4 horas',
                modules: [
                    {
                        title: 'Módulo 1: Fundamentos da Blindagem',
                        lessons: [
                            {
                                title: 'O que é Blindagem',
                                description: 'Entendendo a técnica de blindagem',
                                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                                duration: '8:00',
                                order: 1
                            }
                        ]
                    }
                ]
            }
        ];

        await this.courseModel.insertMany(courses);
        console.log('✅ Sample courses created');
    }
}

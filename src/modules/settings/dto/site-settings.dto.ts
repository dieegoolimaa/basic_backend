import { IsString, IsOptional } from 'class-validator';

export class UpdateSiteSettingsDto {
    // About Section
    @IsString()
    @IsOptional()
    aboutTag?: string;

    @IsString()
    @IsOptional()
    aboutTitle?: string;

    @IsString()
    @IsOptional()
    aboutParagraph1?: string;

    @IsString()
    @IsOptional()
    aboutParagraph2?: string;

    @IsString()
    @IsOptional()
    aboutImageUrl?: string;

    // Stats
    @IsString()
    @IsOptional()
    experienceYears?: string;

    @IsString()
    @IsOptional()
    studentsFormed?: string;

    @IsString()
    @IsOptional()
    averageRating?: string;

    // Founder Info
    @IsString()
    @IsOptional()
    founderName?: string;
}

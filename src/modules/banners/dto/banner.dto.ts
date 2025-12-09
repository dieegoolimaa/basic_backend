import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateBannerDto {
    @IsString()
    imageUrl: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    subtitle?: string;

    @IsString()
    @IsOptional()
    linkUrl?: string;
}

export class UpdateBannerDto {
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    subtitle?: string;

    @IsString()
    @IsOptional()
    linkUrl?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsNumber()
    @IsOptional()
    order?: number;
}

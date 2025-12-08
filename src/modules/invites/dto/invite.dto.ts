import { IsArray, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInviteDto {
    @IsEmail()
    email: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    courseIds?: string[];
}

export class ValidateInviteDto {
    @IsNotEmpty()
    @IsString()
    code: string;
}

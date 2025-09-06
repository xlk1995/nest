import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
@Injectable()
export class CreatePostDto {
    @MaxLength(5, {
        message: 'title must less than $constraint1',
        always: true,
    })
    @IsNotEmpty({
        message: 'title must not be empty',
        groups: ['create'],
    })
    @IsOptional({
        groups: ['update'],
    })
    title: string;

    @MaxLength(5, {
        message: 'body must less than $constraint1',
        always: true,
    })
    @IsNotEmpty({
        message: 'body must not empty',
        always: true,
    })
    @IsOptional({
        groups: ['update'],
    })
    body: string;
    @MaxLength(2, {
        message: 'summary must less than $constraint1',
        always: true,
    })
    @IsOptional({
        always: true,
    })
    summary?: string;
}

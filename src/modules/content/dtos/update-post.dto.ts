import { Injectable } from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsDefined, IsNumber } from 'class-validator';

@Injectable()
export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsNumber(undefined, {
        message: 'id must be number',
        groups: ['update'],
    })
    @IsDefined({
        message: 'id must exist',
        groups: ['update'],
    })
    id: number;
}

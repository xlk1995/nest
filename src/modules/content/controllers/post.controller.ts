import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostService } from '../services/post.service';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}
    @Get()
    index() {
        return this.postService.findAll();
    }

    @Get(':id')
    show(@Param('id') id: number) {
        return this.postService.findOne(id);
    }

    @Post()
    store(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: {
                    target: false,
                },
                groups: ['create'],
            }),
        )
        data: CreatePostDto,
    ) {
        return this.postService.create(data);
    }

    @Patch()
    update(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['update'],
            }),
        )
        data: UpdatePostDto,
    ) {
        return this.postService.update(data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.postService.delete(id);
    }
}

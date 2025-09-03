import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { IPostEntity } from '../types';
import { isNil } from 'lodash';

let posts: IPostEntity[] = [
    {
        title: '文章1',
        body: '内容1',
    },
    {
        title: '文章2',
        body: '内容2',
    },
    {
        title: '文章3',
        body: '内容3',
    },
    {
        title: '文章4',
        body: '内容4',
    },
].map((item, index) => ({ ...item, id: index }));

@Controller('posts')
export class PostController {
    @Get()
    index() {
        return posts;
    }

    @Get(':id')
    show(@Param('id') id: number) {
        const findPost = posts.find((item) => item.id === Number(id));
        if (isNil(findPost)) {
            throw new NotFoundException(`文章不存在！`);
        }
        return findPost;
    }

    @Post()
    store(@Body() data: IPostEntity) {
        const id = Math.max(...posts.map((item) => Number(item.id) + 1));
        const newPost = {
            ...data,
            id,
        };
        posts.push(newPost);
        return newPost;
    }

    @Patch()
    update(@Body() data: IPostEntity) {
        const findPost = posts.find((item) => item.id === Number(data.id));
        if (isNil(findPost)) {
            throw new NotFoundException('文章不存在！');
        }
        const newPosts = posts.map((item) =>
            item.id === Number(data.id) ? { ...findPost, ...data } : item,
        );
        return newPosts;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const findPost = posts.find((item) => item.id === Number(id));
        if (isNil(findPost)) {
            throw new NotFoundException('文章不存在！');
        }
        posts = posts.filter((item) => item.id !== Number(id));
        return posts;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { IPostEntity } from '../types';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
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

@Injectable()
export class PostService {
    findAll() {
        return posts;
    }

    findOne(id: number) {
        const post = posts.find((post) => post.id === Number(id));
        if (isNil(post)) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    create(post: CreatePostDto) {
        const id = Math.max(...posts.map((post) => post.id + 1));
        const newPost = {
            id,
            ...post,
        };
        posts.push(newPost);
        return newPost;
    }

    update({ id, ...data }: UpdatePostDto) {
        const post = posts.find((item) => item.id === Number(id));
        if (isNil(post)) {
            throw new NotFoundException('Post not found');
        }
        const newPosts = posts.map((item) =>
            item.id === Number(id) ? { ...item, ...data } : item,
        );
        posts = newPosts;
        return newPosts.find((item) => item.id === Number(id));
    }

    delete(id: number) {
        const post = posts.find((item) => item.id === Number(id));
        if (isNil(post)) {
            throw new NotFoundException('Post not found');
        }
        posts = posts.filter((item) => item.id !== Number(id));
        return post;
    }
}

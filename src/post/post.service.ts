import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './models/post.model';
import { CreatePostInput } from './models/dto/create-post.input';
import { UpdatePostInput } from './models/dto/update-post.input';
import { Author } from 'src/author/entities/author.entity';
import { AuthorService } from 'src/author/author.service';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly authorService: AuthorService,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }
  create(post: CreatePostInput): Promise<Post> {
    const newpost = this.postRepository.create(post);
    return this.postRepository.save(newpost);
  }

  async update(id: number, post: UpdatePostInput): Promise<Post> {
    const newpost = await this.postRepository.findOneOrFail({ where: { id } });
    return this.postRepository.save({ ...newpost, ...post });
  }

  async delete(id: number): Promise<Post> {
    const post = await this.postRepository.findOneOrFail({ where: { id } });
    await this.postRepository.delete(id);
    return post;
  }

  async getAuthor(authorId: number): Promise<Author> {
    return this.authorService.findOne(authorId);
  }
}

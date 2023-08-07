import { PostService } from './post.service';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './models/post.model';
import { CreatePostInput } from './models/dto/create-post.input';
import { UpdatePostInput } from './models/dto/update-post.input';
import { Author } from 'src/author/entities/author.entity';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query((returns) => [Post])
  async posts() {
    return this.postService.findAll();
  }

  @Mutation((returns) => Post, { name: 'createPost' })
  async addPost(@Args('createPostInput') post: CreatePostInput): Promise<Post> {
    return this.postService.create(post);
  }

  @Mutation((returns) => Post, { name: 'updatePost' })
  async updatePost(
    @Args('id') id: number,
    @Args('updatePostInput') post: UpdatePostInput,
  ): Promise<Post> {
    return this.postService.update(id, post);
  }

  @Mutation((returns) => Post, { name: 'deletePost' })
  async deletePost(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return this.postService.delete(id);
  }

  @ResolveField((returns) => Author)
  async author(@Parent() post: Post): Promise<Author> {
    return this.postService.getAuthor(post.authorId);
  }
}

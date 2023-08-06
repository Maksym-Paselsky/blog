import { PostService } from './post.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { CreatePostInput } from './models/dto/create-post.input';
import { UpdatePostInput } from './models/dto/update-post.input';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {
    console.log('PostResolver constructor');
  }

  @Query((returns) => [Post])
  async posts() {
    console.log('PostResolver posts');
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
}

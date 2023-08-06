import { PostService } from './post.service';
import { Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';

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
}

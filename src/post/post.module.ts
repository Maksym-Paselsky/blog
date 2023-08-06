import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './models/post.model';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostResolver],
})
export class PostModule {}

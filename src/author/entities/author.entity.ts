import { ObjectType, Field, Int } from '@nestjs/graphql';
import { type } from 'os';
import { Post } from 'src/post/models/post.model';
import { post } from 'superagent';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @OneToMany(() => Post, (post) => post.author)
  @Field((type) => [Post], { nullable: true })
  posts?: Post[];
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/author/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;
  @Column()
  @Field((type) => String)
  title: string;
  @Column()
  @Field((type) => String)
  content: string;
  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true, defaultValue: 0 })
  likes: number;

  @Column()
  @Field((type) => Int)
  authorId: number;

  @ManyToOne(() => Author, (author) => author.posts)
  @Field((type) => Author)
  author: Author;
}

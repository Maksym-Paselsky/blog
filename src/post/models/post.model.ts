import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

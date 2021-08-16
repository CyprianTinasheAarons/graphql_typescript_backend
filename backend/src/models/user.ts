import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field,ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;
    
  @Field(() => String , {nullable: true})
  @Column()
  firstname: string;

  @Field(() => String, {nullable: true})
  @Column()
  lastname: string;
    
  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String , {nullable: true})
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

}
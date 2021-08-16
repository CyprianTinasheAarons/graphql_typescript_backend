import { Field, ObjectType } from "type-graphql";
import { User } from "../models/user";
import { FieldError } from "../inputs/field_error";

@ObjectType()
export class UserResponse{

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

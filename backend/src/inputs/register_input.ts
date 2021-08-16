import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {

    @Field()
    firstname: string

    @Field()
    lastname: string

    @Field()
    email: string

    @Field()
    username: string

    @Field()
    password: string;
}

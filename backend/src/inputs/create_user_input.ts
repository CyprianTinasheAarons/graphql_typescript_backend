import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {
    @Field()
    firstname: string

    @Field()
    lastname: string

    @Field()
    email: string

    @Field()
    username: string

    @Field()
    password: string
}

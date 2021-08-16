import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../models/user";
import { CreateUserInput } from "../inputs/create_user_input";
import { UpdateUserInput } from "../inputs/update_user_input";
import { RegisterInput } from "../inputs/register_input";
import { UsernamePasswordInput } from "../inputs/username_password_input";
import { UserResponse } from "../inputs/user_response";

const argon2 = require("argon2");


@Resolver()
export class UserResolver {

    //Get Users
    @Query(() => [User])
    users() {
        return User.find()
    }

    //Get Users by Id
    @Query(() => User)
    userById(@Arg("id") id: string) {
        return User.findOne({ where: { id: id } })
    }
   
    //Create User
    @Mutation(() => User)
    async createUser(@Arg("data") data: CreateUserInput) {
    const user = User.create(data);
    await user.save()
    return user
    }
    
    //Update User
    @Mutation(() => User)
    async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
        const user = await User.findOne({ where: { id: id } })

        if (!user) {
            throw new Error("User not found")
        }

        Object.assign(user, data)
        await user.save()

        return user
        
    }

    @Mutation(() => User)
    async deleteUser(@Arg("id") id: string) {
        const user = await User.findOne({ where: { id : id} })

        if (!user) {
            throw new Error("User not found")
        }

        await user.remove()

        return true
    }
    
    @Mutation(() => UserResponse)
    async register(@Arg("options") options: RegisterInput, @Ctx() { req }: any): Promise<UserResponse> {

        //username Validation
        if (options.username.length <= 2) {
            return {
                errors: [
                    { field: "username", message: "Username must be at least 3 characters long" }
                ]
            }
        }
        //password Validation
        if (options.password.length <= 2) {
            return {
                errors: [
                    { field: "password", message: "Password must be at least 3 characters long" }
                ]
            }
        }

        const hashPassword = await argon2.hash(options.password, 10)
        let user: User | undefined = undefined
        try {
            user = await User.create({
                firstname: options.firstname,
                lastname: options.lastname,
                email: options.email,
                username: options.username,
                password: hashPassword
            }).save();
        } catch (err) {
            if (err.error === 19) {
                return {
                    errors: [
                        { field: "username", message: "Username already exists" }
                    ]
                }
            }
        }
        return { user }
    }

    @Mutation(() => UserResponse)
    async login(@Arg("options") options: UsernamePasswordInput): Promise<UserResponse> {
        const user = await User.findOne({ where: { username: options.username } })

        if(!user) {
            return {
                errors: [{field:"username", message: "Username not found"}]
            }
        }

        const valid = await argon2.verify( user.password ,options.password)
        if (!valid) {
            return {
                errors: [{ field: "password", message: "Invalid password" }]
            }
        }
            return { user }
        
    }



}
    







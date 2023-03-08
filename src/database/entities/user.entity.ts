import { Column, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "./base.entity";
import { TweetEntity } from "./tweet.entity";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity{

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    username: string

    @Column()
    password: string

    @OneToMany(() => TweetEntity, (tweet) => tweet.user)
    tweets: TweetEntity[]

    isPasswordMatch(value: string) {
        return value === this.password
    }
}
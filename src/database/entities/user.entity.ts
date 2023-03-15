import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany } from "typeorm";
import bcryptjs from "bcryptjs";

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

    @Exclude({ toPlainOnly: true })
    @Column()
    password: string

    @OneToMany(() => TweetEntity, (tweet) => tweet.user)
    tweets: TweetEntity[]

    hashPassword(): void {
        this.password = bcryptjs.hashSync(this.password, 10);
    }

    isPasswordMatch(value: string): boolean {
        return bcryptjs.compareSync(value, this.password)
    }
}
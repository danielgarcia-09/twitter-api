import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseEntity } from "../base.entity";
import { UserEntity } from "../users/user.entity";

@Entity({ name: 'tweets' })
export class TweetEntity extends BaseEntity{

    @Column()
    message: string;

    @Exclude({ toPlainOnly: true })
    @Column({ name: "userId" })
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.tweets, { cascade: true })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
    user: UserEntity

    preview() {
        return `${this.message.slice(0, Math.floor(this.message.length / 2))}...`
    }
}
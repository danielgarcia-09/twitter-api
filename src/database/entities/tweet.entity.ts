import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'tweets' })
export class TweetEntity extends BaseEntity{

    @Column()
    message: string;

    @ManyToOne(() => UserEntity, (user) => user.tweets, { cascade: true })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
    user: UserEntity

    @Column({ default: true })
    active: boolean
}
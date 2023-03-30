import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { UserEntity } from "../";
import { BaseEntity } from "../base.entity";

@Entity({ name: "followers", schema: "public" })
export class FollowerEntity extends BaseEntity {

    @Exclude({ toPlainOnly: true })
    @Column({ name: "followerId" })
    followerId: number;

    @OneToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "followerId", referencedColumnName: "id" })
    follower: UserEntity;

    @Exclude({ toPlainOnly: true })
    @Column({ name: "followingId" })
    followingId: number;

    @OneToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "followingId", referencedColumnName: "id" })
    following: UserEntity;
}
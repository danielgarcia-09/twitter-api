import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "tokens", schema: "public" })
export class TokenEntity extends BaseEntity {

    @Column()
    token: string;

    @Column({ type: "timestamp", nullable: true })
    expiredAt: Date;

    @Column({ name: "userId" })
    userId: number

    @ManyToOne(() => UserEntity, user => user.tokens)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: UserEntity;
}
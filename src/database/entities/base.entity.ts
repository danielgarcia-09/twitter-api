import { Exclude, instanceToPlain } from 'class-transformer'
import { BaseEntity as OrmBaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class BaseEntity extends OrmBaseEntity {

    @Exclude({ toPlainOnly: true })
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @Exclude({ toPlainOnly: true })
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @Exclude({ toPlainOnly: true })
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date

    toJSON() {
        return instanceToPlain(this)
    }
}
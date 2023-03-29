import { UserEntity } from "../../entities";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<UserEntity>  {

    listenTo(): typeof UserEntity {
        return UserEntity
    }

    beforeInsert(event: InsertEvent<UserEntity>): void {
        event.entity.hashPassword()
    }
}
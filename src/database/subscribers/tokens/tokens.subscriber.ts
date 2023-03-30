import { generateCode } from "../../../utils/random.util";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { TokenEntity } from "../../entities";

@EventSubscriber()
export class TokensSubscriber implements EntitySubscriberInterface<TokenEntity>  {

    listenTo(): typeof TokenEntity {
        return TokenEntity
    }

    beforeInsert({ entity }: InsertEvent<TokenEntity>): void {
        entity.token = generateCode(32)
    }
}
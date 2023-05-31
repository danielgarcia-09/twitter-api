import { subscribeEvent } from "src/events";
import { TweetEntity } from "../../entities";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class TweetsSubscriber implements EntitySubscriberInterface<TweetEntity>  {

    listenTo(): typeof TweetEntity {
        return TweetEntity
    }

    afterInsert(event: InsertEvent<TweetEntity>): void | Promise<any> {
        // const { user } = event.entity;
        // subscribeEvent.emit("created:tweet", ({ user, tweet: event.entity}))
    }
}
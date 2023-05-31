import { TweetEntity, UserEntity } from "src/database/entities";

export interface IEvent<T> {
    data: T;
}

export interface IUserEvent {
    room: string;
    tweetOwner: string,
    user: UserEntity,
    tweet?: TweetEntity
}
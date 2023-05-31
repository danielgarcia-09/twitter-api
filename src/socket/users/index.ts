import { Namespace, Server as ServerSocket } from "socket.io";
import { userEvents } from "src/constants";
import { subscribeEvent } from "src/events";
import { IUserEvent } from "src/interfaces/events/event.interface";
import { AuthSocketMiddleware } from "../middleware";
import { UserEntity } from "src/database/entities";


export class UsersSocket {

    private readonly io: Namespace;

    constructor(io: ServerSocket) {
        this.io = io.of('/users');
        this.io.use(AuthSocketMiddleware);
        this.connectSocket();
    }

    public connectSocket() {
        this.io.on('connection', (socket) => {
            console.log('a user connected');

            const user: UserEntity = socket.data.user;

            socket.join(user.uuid)

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        })
        this.setEvents();
    }

    public setEvents() {
        this.userTweeted();
    }

    public userTweeted() {
        subscribeEvent.on(userEvents.tweet, (payload: IUserEvent) => {
            const { user, tweetOwner, tweet, room } = payload;
            this.io.to(room).emit(userEvents.tweet, {
                message: `${tweetOwner} tweeted something new! ${tweet.preview()}`,
                tweetReference: tweet.uuid
            })
        })
    }
}
import { Namespace, Server as ServerSocket } from "socket.io";
import { userEvents } from "src/constants";
import { subscribeEvent } from "src/events";
import { IUserEvent } from "src/interfaces/events/event.interface";
import { AuthSocketMiddleware } from "../middleware";
import { UserSocketI } from "src/interfaces/socket/socket.interface";

export class UsersSocket {

    private readonly io: Namespace;

    constructor(io: ServerSocket) {
        this.io = io.of('/users');
        this.io.use(AuthSocketMiddleware);
        this.connectSocket();
    }

    private connectSocket() {
        this.io.on('connection', (socket: UserSocketI) => {
            console.log('a user connected');

            const user = socket.data.user;

            socket.join(user.uuid)

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        })
        this.setEvents();
    }

    private setEvents() {
        this.userTweeted();
    }

    private userTweeted() {
        subscribeEvent.on(userEvents.tweet, (payload: IUserEvent) => {
            const { tweetOwner, tweet, room } = payload;
            this.io.to(room).emit(userEvents.tweet, {
                message: `${tweetOwner} tweeted something new! ${tweet.preview()}`,
                tweetReference: tweet.uuid
            })
        })
    }
}
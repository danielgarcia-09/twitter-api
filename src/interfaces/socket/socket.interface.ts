import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { UserEntity } from "src/database/entities";

export interface UserSocketI extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, { user: UserEntity }> {}

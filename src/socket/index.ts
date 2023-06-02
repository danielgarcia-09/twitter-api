import { Server as ServerSocket } from "socket.io";
import { appConfig } from '../config';
import { UsersSocket } from "./users";

export class MainSocket {

    private readonly io: ServerSocket;
    constructor() {
        this.io = new ServerSocket(appConfig.socketPort, {
            cors: {
                origin: appConfig.isProd ? false : [`http://localhost:${appConfig.port}`]
            }
        })
        this.connectSocket();
    }

    public connectSocket() {
        this.io.on('connection', (socket) => {
            console.log('MainSocket connected');
            
            socket.on('disconnect', () => {
                console.log('MainSocket disconnected');
            })
        })
        this.setNamespaces(this.io);
    }

    public setNamespaces(io: ServerSocket) {
        new UsersSocket(io);
    }
}
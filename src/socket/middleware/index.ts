import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { cookiesConfig, encryptionConfig, jwtConfig } from "src/config";
import { JwtPayload } from "src/interfaces/jwt/jwt.interface";
import { UserEntity } from "src/database/entities";
import { ExtendedError } from "socket.io/dist/namespace";

export const AuthSocketMiddleware = async (socket: Socket, next: (err?: ExtendedError) => void) => {

    const unauthorizedErr = () => next(new Error('Unauthorized'));
    try {
        const authHeader = `${socket.handshake.headers[cookiesConfig.socket.name]}`;
        if (!authHeader) return unauthorizedErr();

        const token = authHeader.decrypt(encryptionConfig.encoding)
        if (!token) return unauthorizedErr();

        const isValidToken: any = jwt.verify(token, jwtConfig.secret);
        if (!isValidToken) return unauthorizedErr();

        const user: JwtPayload = isValidToken;

        const isValidUser = await UserEntity.findOne({ where: { username: user.username } })
        if (!isValidUser) return unauthorizedErr();

        socket.data.user = isValidUser;

        return next();
    } catch (error) {
        console.error(error);
        return unauthorizedErr();
    }
}
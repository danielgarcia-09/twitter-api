import { Request } from "express"
import { UserEntity } from "src/database/entities"

declare global {
    namespace Express {
        export interface Request {
            client: UserEntity
        }
    }


    interface String {
        encrypt(encoding: BufferEncoding): string
        decrypt(encoding: BufferEncoding): string
    }
}

export { }
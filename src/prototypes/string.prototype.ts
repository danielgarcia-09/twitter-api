import { decrypt, encrypt } from "src/utils/encryption.util"

String.prototype.encrypt = function (encoding: BufferEncoding): string {
    return encrypt(this).toString(encoding)
}

String.prototype.decrypt = function (encoding: BufferEncoding): string {
    const buffer = Buffer.from(this, encoding);
    return decrypt(buffer).toString()
}
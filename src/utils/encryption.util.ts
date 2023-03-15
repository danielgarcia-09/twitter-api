import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

import { encryptionConfig } from 'src/config';

const iv = randomBytes(16);
const password = encryptionConfig.secret;
const encryptionKey = scryptSync(password, 'salt', 32) 

export const encrypt = (text: string) => {

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const cipher = createCipheriv('aes-256-ctr', encryptionKey, iv);

    const encryptedText = Buffer.concat([
        cipher.update(text),
        cipher.final(),
    ]);

    return encryptedText;
}

export const decrypt = (encryptedText: Buffer) => {
    const decipher = createDecipheriv('aes-256-ctr', encryptionKey, iv);
    const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);

    return decryptedText;
}
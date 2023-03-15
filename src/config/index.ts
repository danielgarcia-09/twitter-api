export const cookiesConfig = {
    name: process.env.COOKIE_NAME,
    expiration: process.env.COOKIE_EXPIRATION,
    secret: process.env.COOKIE_SECRET,
}

export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
    }
}

export const encryptionConfig = {
    secret: process.env.ENCRYPTION_SECRET,
} 
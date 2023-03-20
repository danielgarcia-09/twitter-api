import 'dotenv/config';

export const appConfig = {
    port: process.env.PORT,
    isProd: process.env.NODE_ENV === "production",
}

export const databaseConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    logging: process.env.DB_LOGGING === "true",
}

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

export const mailerConfig = {
    host: appConfig.isProd ? process.env.EMAIL_PROD_HOST : process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
}
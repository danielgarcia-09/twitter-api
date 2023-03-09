import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

let generalConfig: PostgresConnectionOptions = {
    type: 'postgres',
    synchronize: false,
    entities: [join(__dirname, "./entities/**/*.entity.{ts,js}")],
    migrations: [join(__dirname, "./migrations/**/*.migration.{ts,js}")],
    subscribers: [join(__dirname, "./subscribers/**/*.subscriber.{ts,js}")],
    migrationsTableName: "migrations"
}

const dbOptions: DataSourceOptions = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    logging: process.env.DB_LOGGING === "true",
    ...generalConfig
}

export const DatabaseProvider = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const dbConfig = {
            host: config.get("DB_HOST"),
            port: config.get("DB_PORT"),
            username: config.get("DB_USERNAME"),
            password: config.get("DB_PASSWORD"),
            database: config.get("DB_NAME"),
            schema: config.get("DB_SCHEMA"),
            logger: config.get("DB_LOGGING"),
            ...generalConfig
        }
        return dbConfig
    },
})


export const connection = new DataSource(dbOptions)
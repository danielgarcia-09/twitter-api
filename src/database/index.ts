import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { databaseConfig } from "../config";

console.log({path: join(__dirname, "./entities/**/*.entity.{ts,js}")})
let generalConfig: PostgresConnectionOptions = {
    type: 'postgres',
    synchronize: false,
    entities: [join(__dirname, "./entities/**/*.entity.{ts,js}")],
    migrations: [join(__dirname, "./migrations/**/*.migration.{ts,js}")],
    subscribers: [join(__dirname, "./subscribers/**/*.subscriber.{ts,js}")],
    migrationsTableName: "migrations"
}

console.log("❗ ~ file: index.ts:21 ~ databaseConfig:", databaseConfig)
const dbOptions: DataSourceOptions = {
    ...databaseConfig,
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
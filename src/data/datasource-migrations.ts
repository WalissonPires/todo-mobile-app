import { DataSource } from "typeorm";
import { getDataSourceCommonOptions } from "./datasource-common";

export const MigrationDataSource = new DataSource({
    ...getDataSourceCommonOptions(),
    type: "sqlite",
    database: "./src/data/migrations/migration-database.sqlite",
    synchronize: false,
    logging: false,
});
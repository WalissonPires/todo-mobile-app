import { DataSource } from "typeorm";
import { ILogger, LoggerFactory } from "../common/logger";
import { getDataSourceCommonOptions } from "./datasource-common";
import { Todo as TodoEntity } from "./entities/todo";

export class AppDataSource {
    private static _instance: AppDataSource;
    public static getInstance(): AppDataSource {

        if (!this._instance)
            this._instance = new AppDataSource();

        return this._instance;
    }


    private _dataSource: DataSource;
    private _initializing = false;
    private _initialized = false;
    private _logger: ILogger;

    private constructor() {

        this._logger = LoggerFactory.createLogger('AppDataSource');

        this._dataSource = new DataSource({
            ...getDataSourceCommonOptions(),
            type: 'expo',
            driver: require('expo-sqlite'),
            database: 'todoapp-db.sqlite',
            synchronize: false,
            migrationsRun: false,
        });
    }

    public isInitialized(): boolean {

        return this._initialized;
    }

    public async initialize(): Promise<void> {

        if (this._initializing) return;

        this._initializing = true;

        this._logger.debug('Initializing data');
        await this._dataSource.initialize();
        this._logger.debug('Data initialized');

        await this._dataSource.runMigrations();

        this._initialized = true;
    }

    public getDataSource(): DataSource {

        return this._dataSource;
    }
}
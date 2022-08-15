import { Repository } from "typeorm";
import { ILogger, LoggerFactory } from "../../common/logger";
import { AppDataSource } from "../datasource";
import { Todo as TodoModel } from "../entities/todo";
import { IRepositoryBase } from "./repository-base";

export class TodoRepository implements IRepositoryBase<TodoModel> {

    private _source: Repository<TodoModel>;
    private _logger: ILogger;

    constructor() {

        this._source = AppDataSource.getInstance().getDataSource().getRepository(TodoModel);
        this._logger = LoggerFactory.createLogger('TodoRepository');
    }

    public async getAll(): Promise<Todo[]> {

        await this.awaitInitialized(3);

        this._logger.debug('Getting all todos');
        const data = await this._source.find();
        this._logger.debug(`Got ${data.length} todos`);

        const todos = data.map(item => this.mapToModel(item));
        return todos;
    }

    public async getById(todoId: number): Promise<Todo> {

        await this.awaitInitialized(3);

        const todoFound = await this._source.findOne({ where: { id: todoId } });
        if (todoFound)
            return this.mapToModel(todoFound);
        else
            return Promise.reject(new Error(`Todo with id ${todoId} not found`));
    }

    public async create(newTodo: Omit<Todo, 'id'>): Promise<Todo> {

        await this.awaitInitialized(3);

        const todoCreated = await this._source.save({
            title: newTodo.title,
            completed: newTodo.completed
        });

        return this.mapToModel(todoCreated);
    }

    public async update(todoToUpdate: Pick<Todo, 'id'> & Partial<Omit<Todo, 'id'>>): Promise<Todo> {

        await this.awaitInitialized(3);

        const todoFound = await this._source.findOne({ where: { id: todoToUpdate.id } });
        if (todoFound) {
            const todoUpdated = await this._source.save({
                ...todoFound,
                ...todoToUpdate
            });

            return this.mapToModel(todoUpdated);
        } else {
            return Promise.reject(new Error(`Todo with id ${todoToUpdate.id} not found`));
        }
    }

    public async delete(todoId: number): Promise<void> {

        await this.awaitInitialized(3);

        await this._source.delete({ id: todoId });
    }


    private mapToModel(data: TodoModel): Todo {

        this._logger.debug(`Mapping todo ${data.id} to model: ${JSON.stringify(data)}`);

        return {
            id: data.id,
            title: data.title,
            completed: data.completed
        };
    }

    private awaitInitialized(seconds: number): Promise<void> {

        return new Promise<void>((resolve, reject) => {

            this._logger.debug(`Checking if data is initialized (${seconds} seconds)`);

            if (AppDataSource.getInstance().isInitialized()) {
                this._logger.debug(`Data is initialized`);
                resolve();
                return;
            }

            if (seconds <= 0) {
                this._logger.debug(`Data is not initialized`);
                reject(new Error("Data source is not initialized"));
                return;
            }

            this._logger.debug(`Awaiting initialization for ${seconds} seconds`);
            setTimeout(async () => {
                try {
                    await this.awaitInitialized(seconds - 1);
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            }, 1000);

        });
    }
}


export type Todo = {
    id: number;
    title: string;
    completed: boolean;
}
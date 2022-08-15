import { ILogger, LoggerFactory } from "../../common/logger";
import { AppDataSource } from "../../data/datasource";
import { TodoRepository } from "../../data/repositories/todo-repository";
import { NewTodo, Todo, UpdateTodo } from "./models";


export class TodoService {

    private _logger: ILogger;
    private _repository: TodoRepository;

    constructor() {

        this._logger = LoggerFactory.createLogger("TodoService");
        this._repository = new TodoRepository();
    }

    public async getAll(): Promise<Todo[]> {

        this._logger.debug("Getting all todos");

        const data = await this._repository.getAll();
        return data;
    }

    public async getById(todoId: number): Promise<Todo> {

        this._logger.debug(`Getting todo with id "${todoId}"`);

        const todoFound = await this._repository.getById(todoId);

        if (todoFound)
            return todoFound;
        else
            throw new Error(`Todo with id ${todoId} not found`);
    }

    public async create(todo: NewTodo): Promise<Todo> {

        this._logger.debug(`Creating todo with title "${todo.title}"`);

        const todoCreated = await this._repository.create({ ...todo, completed: false });
        return todoCreated;
    }

    public async update(todo: UpdateTodo): Promise<Todo> {

        this._logger.debug(`Updating todo with id "${todo.id}"`);

        const todoUpdated = await this._repository.update(todo);
        return todoUpdated;
    }

    public async delete(todoId: number): Promise<void> {

        this._logger.debug(`Deleting todo with id "${todoId}"`);

        await this._repository.delete(todoId);
    }
}
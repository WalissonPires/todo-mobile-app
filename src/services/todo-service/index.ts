import { ILogger, LoggerFactory } from "../../common/logger";
import { NewTodo, Todo, UpdateTodo } from "./models";


export class TodoService {

    private static _data: Todo[] = [];

    private _logger: ILogger;

    constructor() {

        this._logger = LoggerFactory.createLogger("TodoService");
    }

    public async getAll(): Promise<Todo[]> {

        this._logger.debug("Getting all todos");
        return Promise.resolve(TodoService._data.map(item => ({ ...item })));
    }

    public async getById(todoId: number): Promise<Todo> {

        this._logger.debug(`Getting todo with id "${todoId}"`);
        const todoFound = TodoService._data.find(t => t.id === todoId);

        if (todoFound)
            return Promise.resolve({ ...todoFound });
        else
            return Promise.reject(new Error(`Todo with id ${todoId} not found`));
    }

    public async create(todo: NewTodo): Promise<Todo> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                this._logger.debug(`Creating todo with title "${todo.title}"`);

                const todoCreated: Todo = {
                    id: Date.now(),
                    title: todo.title,
                    completed: false
                };

                TodoService._data.push(todoCreated);

                resolve(todoCreated);

            }, 20);
        });
    }

    public async update(todo: UpdateTodo): Promise<Todo> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                this._logger.debug(`Updating todo with id "${todo.id}"`);

                const todoFoundIndex = TodoService._data.findIndex(t => t.id === todo.id);

                if (todoFoundIndex >= 0) {

                    const todoFound = TodoService._data[todoFoundIndex];
                    const todoUpdated = {
                        ...todoFound,
                        title: todo.title ?? todoFound.title,
                        completed: todo.completed ?? todoFound.completed
                    };

                    TodoService._data[todoFoundIndex] = todoUpdated;
                    resolve(todoUpdated);
                }
                else
                    reject(new Error(`Todo with id ${todo.id} not found`));

            }, 500);
        });
    }

    public async delete(todoId: number): Promise<void> {

        this._logger.debug(`Deleting todo with id "${todoId}"`);

        const todoIndex = TodoService._data.findIndex(t => t.id === todoId);
        TodoService._data.splice(todoIndex, 1);

        return Promise.resolve();
    }
}
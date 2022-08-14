import { useEffect } from "react";
import { AppError } from "../../../common/exceptions/app-error";
import { ILogger } from "../../../common/logger";
import { TodoService } from "../../../services/todo-service";
import { Todo } from "../../../services/todo-service/models";


export const useTodoLoad = (logger: ILogger, todoId: number | undefined, setTodo: (todo: Todo) => void) => {

    const todoService = new TodoService();

    useEffect(() => {

        if (!todoId) return;

        const getTodo = async () => {

            try {
                logger.debug(`Getting todo ${todoId}`);

                const todo = await todoService.getById(todoId);
                setTodo(todo);
            }
            catch(error) {
                alert(AppError.from(error, 'Erro ao buscar tarefa').message);
            }
        };

        getTodo();

    }, [todoId]);
}
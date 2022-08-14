import { useEffect } from "react";
import { AppError } from "../../../common/exceptions/app-error";
import { ILogger } from "../../../common/logger";
import { TodoService } from "../../../services/todo-service";
import { useAppDispatch } from "../../../store";
import { loadTodos } from "../../../store/todos";

export const useTodoLoad = (logger: ILogger) => {

    const dispatch = useAppDispatch();
    const todoService = new TodoService();

    useEffect(() => {

        const getAllTodos = async () => {

            try {
                logger.debug('Getting all todos');

                const todos = await todoService.getAll();
                dispatch(loadTodos({ todos }));
            }
            catch(error) {
                const appError = AppError.from(error, 'Falha ao buscar todos as tarefas');
                logger.error(appError);

                alert(appError.message);
            }
        }

        getAllTodos();
    }, []);
}
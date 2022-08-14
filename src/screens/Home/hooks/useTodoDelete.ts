import { AppError } from "../../../common/exceptions/app-error";
import { ILogger } from "../../../common/logger";
import { TodoService } from "../../../services/todo-service";
import { useAppDispatch } from "../../../store";
import { removeTodo } from "../../../store/todos";


export const useTodoDelete = (logger: ILogger) => {

    const dispatch = useAppDispatch();
    const todoService = new TodoService();

    const handleDelete = async (todoId: number) => {

        logger.debug(`Handle: Deleting todo ${todoId}`);
        try {
            await todoService.delete(todoId);
            dispatch(removeTodo({ id: todoId }));
        }
        catch(error) {
            const appError = AppError.from(error, 'Falha ao deletar tarefa');
            logger.error(appError);

            alert(appError.message);
        }
    };

    return {
        handleDelete
    };
}
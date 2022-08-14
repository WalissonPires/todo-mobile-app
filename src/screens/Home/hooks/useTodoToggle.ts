import { AppError } from "../../../common/exceptions/app-error";
import { ILogger } from "../../../common/logger";
import { TodoService } from "../../../services/todo-service";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectTodos, updateTodo } from "../../../store/todos";


export const useTodoToggle = (logger: ILogger) => {

    const todoService = new TodoService();

    const itens = useAppSelector(selectTodos);
    const dispatch = useAppDispatch();

    const handleToggleCompleted = async (itemId: number, completed: boolean) => {

        logger.debug(`Toggling completed(${completed}) for item ${itemId}`);

        const item = itens.find(i => i.id === itemId);

        if (!item) return;

        try {
            const itemUpdated = { ...item, completed };
            await todoService.update(itemUpdated);
            dispatch(updateTodo({ todo: itemUpdated }));
        }
        catch (error) {
            const appError = AppError.from(error, 'Falha ao atualizar o item');
            logger.error(appError);

            alert(appError.message);
        }
    };

    return {
        handleToggleCompleted
    };
}
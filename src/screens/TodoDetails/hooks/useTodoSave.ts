import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TodoDetailsScreenProps } from "../..";
import { AppError } from "../../../common/exceptions/app-error";
import { ILogger } from "../../../common/logger";
import { TodoService } from "../../../services/todo-service";
import { useAppDispatch } from "../../../store";
import { addTodo, updateTodo } from "../../../store/todos";


export const useTodoSave = (logger: ILogger, todoId: number | undefined) => {

    const [ isLoading, setIsLoading ] = useState(false);
    const dispatch = useAppDispatch();
    const nativation = useNavigation<TodoDetailsScreenProps["navigation"]>();

    const todoService = new TodoService();

    const handleSave = async (todo: TodoModel) => {

        const isNewTodo = !todoId;

        try {
            const errors = validateTodo(todo);
            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            logger.debug(`Saving todo "${todo.title}"`);
            setIsLoading(true);

            if (isNewTodo) {

                const todoCreated = await todoService.create({ title: todo.title });
                dispatch(addTodo({ todo: todoCreated }));

                logger.debug(`Todo ${todo.title} created`);
            }
            else {

                const todoUpdated = await todoService.update({ id: todoId, title: todo.title });
                dispatch(updateTodo({ todo: todoUpdated }));

                logger.debug(`Todo ${todo.title} updated`);
            }
        }
        catch(error) {
            const appErro = AppError.from(error, 'Erro ao salvar tarefa');
            logger.error(appErro);

            alert(appErro);
        }
        finally {
            setIsLoading(false);
        }

        nativation.goBack();
    };

    return {
        handleSave,
        isLoading
    }
}

const validateTodo = (newTodo: TodoModel) => {

    let errors: string[] = [];

    if (!newTodo.title) {
        errors.push('O titulo é obrigatório');
    }
    else if (newTodo.title.length > 30) {
        errors.push('O titulo deve ter no máximo 30 caracteres');
    }

    return errors;
}

export type TodoModel = {
    title: string;
}
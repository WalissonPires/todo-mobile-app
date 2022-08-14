import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { TodoDetailsScreenProps } from "..";
import { AppError } from "../../common/exceptions/app-error";
import { LoggerFactory } from "../../common/logger";
import { Button } from "../../components/core/Button";
import { TextField } from "../../components/core/TextField";
import { Todo } from "../../components/TodoList/models";
import { TodoService } from "../../services/todo-service";
import { useAppDispatch } from "../../store";
import { addTodo, updateTodo } from "../../store/todos";
import { styles } from "./styles";


export const TodoDetails = () => {

    const { todoId } = useRoute<TodoDetailsScreenProps["route"]>().params;
    const nativation = useNavigation<TodoDetailsScreenProps["navigation"]>();
    const [title, setTitle] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);
    const dispatch = useAppDispatch();

    const logger = LoggerFactory.createLogger('TodoDetails');

    const validateTodp = (newTodo: Pick<Todo, 'title'>) => {

        logger.debug(`Validating todo: ${JSON.stringify(newTodo)}`);

        let errors: string[] = [];

        if (!newTodo.title) {
            errors.push('O titulo é obrigatório');
        }
        else if (newTodo.title.length > 30) {
            errors.push('O titulo deve ter no máximo 30 caracteres');
        }

        return errors;
    }

    const handleSave = async () => {

        const todoService = new TodoService();
        const isNewTodo = !todoId;

        try {
            const errors = validateTodp({ title });
            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            logger.debug(`Saving todo "${title}"`);
            setIsLoading(true);

            if (isNewTodo) {

                const todoCreated = await todoService.create({ title });
                dispatch(addTodo({ todo: todoCreated }));

                logger.debug(`Todo ${title} created`);
            }
            else {

                const todoUpdated = await todoService.update({ id: todoId, title });
                dispatch(updateTodo({ todo: todoUpdated }));

                logger.debug(`Todo ${title} updated`);
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

    useEffect(() => {

        if (!todoId) return;

        const getTodo = async () => {

            try {
                const todo = await new TodoService().getById(todoId);
                setTitle(todo.title);
            }
            catch(error) {
                alert(AppError.from(error, 'Erro ao buscar tarefa').message);
            }
        };

        getTodo();

    }, [todoId]);

    return (
        <View style={styles.container}>
            <TextField placeholder="Título" value={title} onChangeText={text => setTitle(text)} autoFocus />
            <Button title="Salvar" disabled={isLoading} onPress={handleSave} />
        </View>
    );
}
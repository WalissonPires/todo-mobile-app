import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Screens, TodoDetailsScreenProps } from '..';
import { AppCenterButton } from "../../components/AppCenterButton";
import { TodoFilter } from "../../components/TodoFilter";
import { TodoList } from "../../components/TodoList";
import { styles } from "./styles";
import { TodoService } from '../../services/todo-service';
import { AppError } from '../../common/exceptions/app-error';
import { LoggerFactory } from '../../common/logger';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadTodos, removeTodo, selectTodos, updateTodo } from '../../store/todos';

export const Home = () => {

    const logger = LoggerFactory.createLogger('Home');
    logger.debug('Rendering');

    const nav = useNavigation<TodoDetailsScreenProps['navigation']>();
    const [searchText, setSearchText] = useState('');
    const dispatch = useAppDispatch();

    const itens = useAppSelector(selectTodos);
    const itensFilterd = itens.filter(item => item.title.toLocaleLowerCase().includes(searchText));


    const handleToggleCompleted = async (itemId: number, completed: boolean) => {

        logger.debug(`Toggling completed(${completed}) for item ${itemId}`);

        const item = itens.find(i => i.id === itemId);

        if (!item) return;

        try {
            const itemUpdated = { ...item, completed };
            await new TodoService().update(itemUpdated);
            dispatch(updateTodo({ todo: itemUpdated }));
        }
        catch (error) {
            const appError = AppError.from(error, 'Falha ao atualizar o item');
            logger.error(appError);

            alert(appError.message);
        }
    };

    const handleShowNewTodoScreen = () => {

        nav.navigate(Screens.TodoDetails, { todoId: undefined });
    }

    const handleFilterTextChange = (text: string) => {

        setSearchText(text.toLowerCase());
    }

    const handleItemSelected = (todoId: number) => {

        nav.navigate(Screens.TodoDetails, { todoId: todoId });
    }

    const handleDelete = async (todoId: number) => {

        logger.debug(`Handle: Deleting todo ${todoId}`);
        try {
            const todoService = new TodoService();
            await todoService.delete(todoId);
            dispatch(removeTodo({ id: todoId }));
        }
        catch(error) {
            const appError = AppError.from(error, 'Falha ao deletar tarefa');
            logger.error(appError);

            alert(appError.message);
        }
    }

    //useLayoutEffect(
    useEffect(() => {

        //useCallback(() => {

            const getAllTodos = async () => {

                try {
                    logger.debug('Getting all todos');

                    const todos = await new TodoService().getAll();
                    dispatch(loadTodos({ todos }));
                }
                catch(error) {
                    const appError = AppError.from(error, 'Falha ao buscar todos as tarefas');
                    logger.error(appError);

                    alert(appError.message);
                }
            }

            getAllTodos();
        //}, [])
    }, []);

    return (
        <View style={styles.container}>
            <TodoFilter onChangeText={handleFilterTextChange} />
            <TodoList itens={itensFilterd} onToggleCompleted={handleToggleCompleted} onItemPress={handleItemSelected} onRequestDelete={handleDelete} />
            { itens.length === 0 && searchText.length === 0 && <View style={{ flex: 1 }}><Text>Crie novas tarefas clicando no botão +</Text></View> }
            { itensFilterd.length === 0 && searchText.length > 0 && <View style={{ flex: 1 }}><Text>Nenhuma tarefa corresponde a pesquisa</Text></View> }
            <StatusBar style="auto" />
            <AppCenterButton label='+' onPress={handleShowNewTodoScreen} />
        </View>
    );
}
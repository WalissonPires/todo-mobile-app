import { StatusBar } from 'expo-status-bar';
import React from "react";
import { View, Text } from "react-native";
import { AppCenterButton } from "../../components/AppCenterButton";
import { TodoFilter } from "../../components/TodoFilter";
import { TodoList } from "../../components/TodoList";
import { styles } from "./styles";
import { LoggerFactory } from '../../common/logger';
import { useAppSelector } from '../../store';
import { selectTodos } from '../../store/todos';
import { useTodoDetails } from './hooks/useTodoDetails';
import { useTodoDelete } from './hooks/useTodoDelete';
import { useTodoToggle } from './hooks/useTodoToggle';
import { useTodoFilter } from './hooks/useTodoFilter';
import { useTodoLoad } from './hooks/useTodoLoad';

export const Home = () => {

    const logger = LoggerFactory.createLogger('Home');
    logger.debug('Rendering');

    const itens = useAppSelector(selectTodos);

    const { handleItemSelected, handleShowNewTodoScreen } = useTodoDetails(logger);
    const { handleDelete } = useTodoDelete(logger);
    const { handleToggleCompleted } = useTodoToggle(logger);
    const { handleFilterTextChange, searchText, itensFilterd } = useTodoFilter(logger, itens);

    useTodoLoad(logger);

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
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { View, Text } from "react-native";
import { AppCenterButton } from "../../components/AppCenterButton";
import { TodoFilter } from "../../components/TodoFilter";
import { TodoList } from "../../components/TodoList";
import { Screen, Title, Header, FilterContainer } from "./styles";
import { colors } from "../../styles/colors";
import defaultShadows from "../../styles/shadow";
import { LoggerFactory } from '../../common/logger';
import { useAppSelector } from '../../store';
import { selectTodos } from '../../store/todos';

import { useTodoDetails } from './hooks/useTodoDetails';
import { useTodoDelete } from './hooks/useTodoDelete';
import { useTodoToggle } from './hooks/useTodoToggle';
import { useTodoFilter } from './hooks/useTodoFilter';
import { useTodoLoad } from './hooks/useTodoLoad';
import { TextMuted } from '../../components/core/TextMuted';

export const Home = () => {

    const logger = LoggerFactory.createLogger('Home');
    logger.debug('Rendering');

    const itens = useAppSelector(selectTodos);

    const { handleItemSelected, handleShowNewTodoScreen } = useTodoDetails(logger);
    const { handleDelete } = useTodoDelete(logger);
    const { handleToggleCompleted } = useTodoToggle(logger);
    const { handleFilterTextChange, searchText, itensFilterd } = useTodoFilter(logger, itens);

    useTodoLoad(logger);

    const EmptyMessage = (props: { message: string; }) => <View style={{ flex: 1 }}><TextMuted>{props.message}</TextMuted></View>;

    return (
        <Screen>
            <Header>
                <Title>Lista de tarefas</Title>
                <FilterContainer style={defaultShadows.shadow2}>
                    <TodoFilter onChangeText={handleFilterTextChange} />
                </FilterContainer>
            </Header>
            <TodoList itens={itensFilterd} onToggleCompleted={handleToggleCompleted} onItemPress={handleItemSelected} onRequestDelete={handleDelete} />
            { itens.length === 0 && searchText.length === 0 && <EmptyMessage message="Crie novas tarefas clicando no botão +" /> }
            { itensFilterd.length === 0 && searchText.length > 0 && <EmptyMessage message="Nenhuma tarefa corresponde a pesquisa" /> }
            <AppCenterButton label='+' onPress={handleShowNewTodoScreen} />
            <StatusBar backgroundColor={colors.primary} style="auto" />
        </Screen>
    );
}
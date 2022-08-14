import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { TodoDetailsScreenProps } from "..";
import { LoggerFactory } from "../../common/logger";
import { Button } from "../../components/core/Button";
import { TextField } from "../../components/core/TextField";
import { useTodoLoad } from "./hooks/useTodoLoad";
import { useTodoSave } from "./hooks/useTodoSave";
import { styles } from "./styles";


export const TodoDetails = () => {

    const { todoId } = useRoute<TodoDetailsScreenProps["route"]>().params;
    const [title, setTitle] = React.useState('');

    const logger = LoggerFactory.createLogger('TodoDetails');

    const { handleSave, isLoading } = useTodoSave(logger, todoId);

    useTodoLoad(logger, todoId, todo => setTitle(todo.title));

    return (
        <View style={styles.container}>
            <TextField placeholder="Título" value={title} onChangeText={text => setTitle(text)} autoFocus />
            <Button title="Salvar" disabled={isLoading} onPress={() => handleSave({ title })} />
        </View>
    );
}
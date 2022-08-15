import React from "react";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { AntDesign } from '@expo/vector-icons';
import { Todo } from "../models";
import { styles } from "./styles";

export const TodoItem = ({ item, onToggleCompleted, onRequestDelete }: TodoItemProps) => {

    const handleCheck = () => onToggleCompleted(item.id, !item.completed);
    const handleDelete = () => onRequestDelete(item.id);

    return (
        <View style={styles.container}>
            <Checkbox style={styles.checkbox} value={item.completed} onValueChange={handleCheck} />
            <Text style={styles.title}>{item.title}</Text>
            <AntDesign name="close" size={18} color="#aaa" onPress={handleDelete} />
        </View>
    )
}


export type TodoItemProps = {
    item: Todo;
    onToggleCompleted: (itemId: number, completed: boolean) => void;
    onRequestDelete: (itemId: number) => void;
}
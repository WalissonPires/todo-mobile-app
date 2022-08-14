import React from "react";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { Feather } from '@expo/vector-icons';
import { Todo } from "../models";
import { styles } from "./styles";
import defaultShadows from "../../../styles/shadow";

export const TodoItem = ({ item, onToggleCompleted, onRequestDelete }: TodoItemProps) => {

    const handleCheck = () => onToggleCompleted(item.id, !item.completed);
    const handleDelete = () => onRequestDelete(item.id);

    return (
        <View style={[styles.container, defaultShadows.shadow1]}>
            <Checkbox style={styles.checkbox} value={item.completed} onValueChange={handleCheck} />
            <Text style={styles.title}>{item.title}</Text>
            <Feather name="delete" size={24} color="#FF6464" onPress={handleDelete} />
        </View>
    )
}


export type TodoItemProps = {
    item: Todo;
    onToggleCompleted: (itemId: number, completed: boolean) => void;
    onRequestDelete: (itemId: number) => void;
}
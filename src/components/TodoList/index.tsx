import React from "react";
import { FlatList, SafeAreaView, ScrollView, Touchable, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Todo } from "./models"
import { styles } from "./styles";
import { TodoItem } from "./TodoItem";


export const TodoList = ({ itens, onToggleCompleted, onRequestDelete, onItemPress }: TodoListProps) => {

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={itens}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onItemPress(item.id)} style={styles.itemWrapper}>
                        <TodoItem item={item} onToggleCompleted={onToggleCompleted} onRequestDelete={onRequestDelete} />
                    </TouchableOpacity >
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}


export type TodoListProps = {
    itens: Todo[],
    onToggleCompleted: (itemId: number, completed: boolean) => void;
    onRequestDelete: (itemId: number) => void;
    onItemPress: (itemId: number) => void;
}
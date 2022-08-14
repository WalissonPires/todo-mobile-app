import React from "react";
import { View } from "react-native";
import { useDebouncedCallback } from 'use-debounce';
import { TextField } from "../core/TextField";
import { styles } from "./styles";


export const TodoFilter = ({ defaultText, onChangeText }: TodoFilterProps) => {

    const [ text, setText ] = React.useState(defaultText || '');
    const debouncedOnChangeText = useDebouncedCallback((text) => onChangeText(text), 300);

    const handleChangeText = (text: string) => {

        setText(text);
        debouncedOnChangeText(text);
    }

    return (
        <View style={styles.container}>
            <TextField placeholder="Pesquisar" value={text} onChangeText={handleChangeText} />
        </View>
    )
}

export type TodoFilterProps = {
    defaultText?: string;
    onChangeText: (text: string) => void;
}
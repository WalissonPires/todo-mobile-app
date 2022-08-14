import { useState } from "react";
import { ILogger } from "../../../common/logger";
import { Todo } from "../../../components/TodoList/models";

export const useTodoFilter = (logger: ILogger, itens: Todo[]) => {

    const [searchText, setSearchText] = useState('');
    const itensFilterd = itens.filter(item => item.title.toLocaleLowerCase().includes(searchText));

    const handleFilterTextChange = (text: string) => {

        setSearchText(text.toLowerCase());
    };

    return {
        searchText,
        handleFilterTextChange,
        itensFilterd
    };
}
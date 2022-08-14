import { useNavigation } from "@react-navigation/native";
import { Screens, TodoDetailsScreenProps } from "../..";
import { ILogger } from "../../../common/logger";


export const useTodoDetails = (logger: ILogger) => {

    const nav = useNavigation<TodoDetailsScreenProps['navigation']>();

    const handleShowNewTodoScreen = () => {

        nav.navigate(Screens.TodoDetails, { todoId: undefined });
    };

    const handleItemSelected = (todoId: number) => {

        nav.navigate(Screens.TodoDetails, { todoId: todoId });
    };

    return {
        handleShowNewTodoScreen,
        handleItemSelected
    };
}
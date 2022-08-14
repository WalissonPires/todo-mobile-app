import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../services/todo-service/models";
import type { RootState } from "..";


interface TodosState {
    itens: Todo[];
}

const initialState: TodosState = {
    itens: []
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        loadTodos: (state, action: PayloadAction<{ todos: Todo[] }>) => {
            state.itens = action.payload.todos.map(item => ({ ...item }));
        },
        addTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
            state.itens.push({ ...action.payload.todo });
        },
        removeTodo: (state, action: PayloadAction<{ id: number }>) => {
            const todoIndex = state.itens.findIndex(todo => todo.id === action.payload.id);
            state.itens.splice(todoIndex, 1);
        },
        updateTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
            const todoIndex = state.itens.findIndex(todo => todo.id === action.payload.todo.id);
            state.itens[todoIndex] = { ...action.payload.todo };
        }
    }
});


export const { loadTodos, addTodo, removeTodo, updateTodo } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.itens;
export const selectTodo = (state: RootState, id: number) => state.todos.itens.find(x => x.id === id);

export default todosSlice.reducer;
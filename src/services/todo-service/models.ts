

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
}

export type NewTodo = {
    title: string;
}

export type UpdateTodo = {
    id: number;
    title?: string;
    completed?: boolean;
}
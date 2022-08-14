import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    TodoDetails: {
        todoId?: number;
    };
};

export const Screens: Record<keyof RootStackParamList, keyof RootStackParamList> = {
    Home: 'Home',
    TodoDetails: 'TodoDetails',
}


export type TodoDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'TodoDetails'>;
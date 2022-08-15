import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    Details: {
        todoId?: number;
    };
};

export const Screens: Record<keyof RootStackParamList, keyof RootStackParamList> = {
    Home: 'Home',
    Details: 'Details',
}


export type TodoDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
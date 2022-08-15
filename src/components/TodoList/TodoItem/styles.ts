import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        width: '100%',

        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    checkbox: {
        marginRight: 20,
    },
    title: {
        flex: 1,
        color: colors.text
    }
});

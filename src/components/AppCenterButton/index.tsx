import { View } from "react-native";
import { CircleButton } from "../CicleButton"
import { styles } from "./styles";


export const AppCenterButton = ({ label, onPress }: AppCenterButtonProps) => {

    return (
        <View style={styles.container}>
            <CircleButton label={label} onPress={onPress} />
        </View>
    );
}

export type AppCenterButtonProps = {
    onPress: () => void;
    label: string;
}
import styled from "styled-components/native";
import { colors } from "../../../styles/colors";

const ButtonBase = styled.TouchableOpacity`
    height: 50px;
    width: 100%;
    background-color: ${colors.primary};
    color: ${colors.textInPrimary};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    color: ${colors.textInPrimary};
`;

export const Button = (props: ButtonProps) => {

    const { title, ...restProps } = props;

    return (
        <ButtonBase {...restProps}>
            <ButtonText>{title}</ButtonText>
        </ButtonBase>
    );
}

export type ButtonProps = {
    onPress: () => void;
    title: string;
    disabled?: boolean;
}
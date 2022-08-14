import styled from "styled-components/native";
import { colors } from "../../../styles/colors";

export const TextField = styled.TextInput`
    height: 50px;
    width: 100%;
    background-color: #fff;

    border-bottom-width: 1px;
    border-bottom-color: ${colors.primary};
    padding: 5px;
    margin-bottom: 10px;
`;
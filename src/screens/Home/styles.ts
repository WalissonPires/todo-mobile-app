import styled from "styled-components/native";
import { colors } from "../../styles/colors";
import { paddings } from "../../styles/paddings";
import { Screen as ScreenBase } from "../base/screen-base";


export const Screen = styled(ScreenBase)`
    align-items: center;
    justify-content: center;
`;

export const Header = styled.View`
    position: relative;
    background-color: ${colors.primary};
    width: 100%;
    height: 100px;
    padding: ${paddings.screen}px;
    margin-bottom: 40px;
`;

export const FilterContainer = styled.View`
    background-color: #fff;
    position: absolute;
    bottom: -30px;
    left: 8%;
    width: 90%;
    padding: 10px;
    padding-bottom: 0;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #fff;
`;
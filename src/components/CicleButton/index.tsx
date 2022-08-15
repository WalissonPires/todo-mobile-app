import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import defaultShadows from "../../styles/shadow";

export const CircleButton = ({ onPress, label }: CircleButtonProps) => {

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.primary,
            borderWidth: 1,
            borderColor: colors.textInPrimary,
        },
        label: {
            color: colors.textInPrimary,
        }
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, defaultShadows.shadow3 ]}>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

export type CircleButtonProps = {
    onPress: () => void;
    label: string;
}
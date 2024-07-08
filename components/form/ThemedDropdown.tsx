import { produce } from "immer";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";

import { useThemeColor } from "@/hooks/useThemeColor";

type Props = PickerSelectProps;

export default function ThemedDropdown({ style, ...props }: Props) {
    const color = useThemeColor({}, "text");
    const borderColor = useThemeColor({}, "border");
    const themedPickerStyle = useMemo(() => {
        return produce(pickerSelectStyles, (draft) => {
            draft.inputIOS.color = color;
            draft.inputIOS.borderColor = borderColor;
            draft.inputAndroid.color = color;
            draft.inputAndroid.borderColor = borderColor;
        });
    }, [color, borderColor]);
    return (
        <RNPickerSelect
            style={{
                ...style,
                ...themedPickerStyle,
            }}
            {...props}
        />
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 8,
        borderStyle: "solid",
        color: "white",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "purple",
        borderRadius: 8,
        borderStyle: "solid",
        color: "white",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

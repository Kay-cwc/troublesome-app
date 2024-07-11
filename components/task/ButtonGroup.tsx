import { PropsWithChildren } from "react";
import { View } from "react-native";

export function ButtonGroup(props: PropsWithChildren) {
    return (
        <View
            style={{
                flexDirection: "row",
                gap: 16,
                justifyContent: "center",
            }}
        >
            {props.children}
        </View>
    );
}

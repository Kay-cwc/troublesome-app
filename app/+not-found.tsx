import { useRoute } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TaskListRoute } from "@/constants/route";

export default function NotFoundScreen() {
    const route = useRoute();
    useEffect(() => {
        console.log(route);
    }, [route]);
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <ThemedView style={styles.container}>
                <ThemedText type="title">Something went wrong.</ThemedText>
                <Link href={TaskListRoute} style={styles.link}>
                    <ThemedText type="link">Go to home screen!</ThemedText>
                </Link>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});

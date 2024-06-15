import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "@/components/provider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>

  );
}

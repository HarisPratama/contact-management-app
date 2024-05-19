import { Stack } from "expo-router";
import { Provider } from 'react-redux';

import store from '../store';
import ContactFormScreen from "./contact-form";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
        <Stack.Screen name="contact-form" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}

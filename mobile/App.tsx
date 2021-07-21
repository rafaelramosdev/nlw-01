import { StatusBar } from 'expo-status-bar';

import AppLoading from 'expo-app-loading';

import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

import { AppStack } from './src/routes/AppStack';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <>
      <AppStack />
      <StatusBar style="dark" backgroundColor="transparent" translucent />
    </>
  );
}

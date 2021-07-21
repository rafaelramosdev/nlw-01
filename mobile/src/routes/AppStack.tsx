import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages/Home';
import { Detail } from '../pages/Detail';
import { Points } from '../pages/Points';

const { Navigator, Screen } = createStackNavigator();

export function AppStack() {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="Detail" component={Detail} />
        <Screen name="Points" component={Points} />
      </Navigator>
    </NavigationContainer>
  );
}
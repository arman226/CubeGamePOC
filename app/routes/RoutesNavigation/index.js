import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Cube from 'screens/CubeGame';
import Home from 'screens/Home';

const Stack = createStackNavigator();

const RoutesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cube"
        component={Cube}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesNavigation;

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Cube from 'screens/CubeGame';

const Stack = createStackNavigator();

const RoutesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Cube}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesNavigation;

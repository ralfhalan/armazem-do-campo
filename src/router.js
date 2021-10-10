import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from './global/styles/theme';

import Login from './screens/Login';
import Register from './screens/Register';
import Purchase from './screens/Purchase';
import RegisterProduct from './screens/RegisterProduct';
import Disaproverd from './screens/Disapproved';
import Waiting from './screens/Waiting';
import Admin from './screens/Admin';

const {Navigator, Screen} = createNativeStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    background: theme.pallete.primary,
  },
};

const Router = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Navigator
        initialRouteName="RegisterProduct"
        headerMode="none"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}>
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="Purchase" component={Purchase} />
        <Screen name="RegisterProduct" component={RegisterProduct} />
        <Screen name="Disapproved" component={Disaproverd} />
        <Screen name="Waiting" component={Waiting} />
        <Screen name="Admin" component={Admin} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;

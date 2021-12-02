import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from './global/styles/theme';

import Login from './screens/Login';
import Register from './screens/Register';
import Purchase from './screens/Purchase';
import RegisterProduct from './screens/RegisterProduct';
import Feedback from './screens/Feedback';
import Admin from './screens/Admin';
import ParticipantManagement from './screens/ParticipantManagement';
import ProductManagement from './screens/ProductManagement';
import Requests from './screens/Requests';
import ProductInfo from './screens/ProductInfo';
import Profile from './screens/Profile';
import Basket from './screens/Basket';

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
        initialRouteName="Login"
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
        <Screen name="Feedback" component={Feedback} />
        <Screen name="Admin" component={Admin} />
        <Screen
          name="ParticipantManagement"
          component={ParticipantManagement}
        />
        <Screen name="ProductManagement" component={ProductManagement} />
        <Screen name="Requests" component={Requests} />
        <Screen name="ProductInfo" component={ProductInfo} />
        <Screen name="Profile" component={Profile} />
        <Screen name="Basket" component={Basket} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;

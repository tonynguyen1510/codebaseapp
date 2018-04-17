import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import CounterViewContainer from '../counter/CounterViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';
import LoginContainer from '../auth/Login/LoginContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Login: { screen: LoginContainer },
  Counter: { screen: CounterViewContainer },
  Color: { screen: ColorViewContainer }
}, {
    tabBarOptions: {
      ...Platform.select({
        android: {
          activeTintColor: activeColor,
          indicatorStyle: { backgroundColor: activeColor },
          style: { backgroundColor: headerColor }
        }
      })
    }
  });

MainScreenNavigator.navigationOptions = {
  title: 'Pepperoni App Template',
  headerTitleStyle: { color: 'white' },
  headerStyle: {
    backgroundColor: headerColor,
    elevation: 0 // disable header elevation when TabNavigator visible
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: { screen: MainScreenNavigator },
  InfiniteColorStack: { screen: LoginContainer }
});

export default AppNavigator;
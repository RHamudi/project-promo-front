import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/Pages/Screens';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AlertNotificationRoot>
          <MyStack />
        </AlertNotificationRoot>
      </NavigationContainer>
    </Provider>
  );
}

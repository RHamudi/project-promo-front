import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/Pages/Screens';
import { Provider } from 'react-redux';
import store from './src/Redux/store';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}

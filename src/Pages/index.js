import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Business from './Business';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Business" component={Business}/>
    </Stack.Navigator>
  );
}
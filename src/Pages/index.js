import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Business from './Business';
import Login from './Login/Index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function MyStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Business" component={Business}/>
      <Tab.Screen name="Login" component={Login}/>
    </Tab.Navigator>
  );
}
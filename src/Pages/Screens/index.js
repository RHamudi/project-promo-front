import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import Business from '../Business';
import Login from '../Login/Index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { useStateLogin } from '../../Redux/LoginSlice';
import Account from '../Account';

const Tab = createBottomTabNavigator();

const CompanyStack = createStackNavigator();

export function CompanyStackScreen() {
  const {AuthenticatedIs} = useSelector(useStateLogin)

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      {AuthenticatedIs ? (
        <Tab.Screen name="Login" component={Account}/>
      ) : (
        <Tab.Screen name="Login" component={Login}/>
      )}
    </Tab.Navigator>
    
  );
};

export default function MyStack() {
  return (
    <CompanyStack.Navigator>
      <CompanyStack.Screen name="Principal" component={CompanyStackScreen} options={{ headerShown: false }}/>
      <CompanyStack.Screen name="Business" component={Business}/>
    </CompanyStack.Navigator>
  );
}
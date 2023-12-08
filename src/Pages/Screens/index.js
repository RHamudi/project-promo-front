import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import Business from '../Business';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { useStateLogin } from '../../Redux/LoginSlice';
import Account from '../Account';
import AddBusiness from '../CreateBusiness';
import CreateUser from '../CreateUser';
import Login from '../Login'

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
      <CompanyStack.Screen name="AddBusiness" component={AddBusiness} />
      <CompanyStack.Screen name="AddUser" component={CreateUser} />
    </CompanyStack.Navigator>
  );
}
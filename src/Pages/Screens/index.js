import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import Business from '../Business';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { useStateLogin } from '../../Redux/LoginSlice';
import Account from '../Account';
import AddBusiness from '../CreateBusiness';
import CreateUser from '../CreateUser';
import Login from '../Login/Index'
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CreateProduct from '../CreateProduct';
import { Producs } from '../Products';

const Tab = createBottomTabNavigator();

const CompanyStack = createStackNavigator();

export function CompanyStackScreen() {
  const {AuthenticatedIs} = useSelector(useStateLogin)

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} 
        options={{
          tabBarIcon: () => <SimpleLineIcons name="home" size={24} color="black" /> 
        }}
      />
      {AuthenticatedIs ? (
        <Tab.Screen name="Account" component={Account} 
          options={{
            tabBarIcon: () => <MaterialIcons name="account-circle" size={24} color="black" />
          }}
        />
      ) : (
        <Tab.Screen name="Login" component={Login}
        options={{
          
          tabBarIcon: () => <SimpleLineIcons name="login" size={24} color="black" />
        }}
        />
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
      <CompanyStack.Screen name="AddProduct" component={CreateProduct} />
      <CompanyStack.Screen name="Products" component={Producs} />
    </CompanyStack.Navigator>
  );
}
import { Text, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import { ManageExpense } from './screens/ManageExpense';
import { AllExpenses } from './screens/AllExpenses';
import { RecentExpenses } from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from './components/UI/IconButton';
import Login from './screens/Login';
import Signup from './screens/Signup';
import AuthContent from './components/Auth/AuthContent';
import { AuthContext } from './store/auth-context';
import ExpensesContextProvider from './store/expense-context';
import { Profile } from './screens/Profile';
import { AllPlaces } from './screens/place/AllPlaces';
import { AddPlace } from './screens/place/AddPlace';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon={"add"}
            size={32}
            color={tintColor}
            onPress={() => {
              const routeState = navigation.getState();
              const currentRoute = routeState.routes[routeState.index];
              if (currentRoute.name === "RecentExpenses" || currentRoute.name === "AllExpense") {
                navigation.navigate("ManageExpenses")
              }
              if (currentRoute.name === "AllPlaces") {
                navigation.navigate("AddPlace")
              }
            }}
          />
        )
      }
      )}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ size, color }) => <Ionicons name='hourglass' size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="AllExpense"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ size, color }) => <Ionicons name='calendar' size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={{
          title: "All Places",
          tabBarLabel: "Places",
          tabBarIcon: ({ size, color }) => <Ionicons name='location' size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => <Ionicons name='person-outline' size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white'
    }}>
      <Stack.Screen
        name='ExpenseOverview'
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <Stack.Screen
        name='ManageExpenses'
        component={ManageExpense}
        options={{
          presentation: "modal"
        }}
      />
      <Stack.Screen
        name='AddPlace'
        component={AddPlace}
        options={{
          presentation: "modal"
        }}
      />
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.authColors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.authColors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export const Navigation = () => {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ?
        <AuthStack /> : (
          <ExpensesContextProvider>
            <AuthenticatedStack />
          </ExpensesContextProvider>
        )
      }
    </NavigationContainer>
  )
}
import React from "react";
//!Importing all the screens in our project
import Slider from "../screens/Slider";
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import EmailVerification from "../screens/EmailVerification";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";

import MainScreen from "../screens/MainScreen";
import UserCamera from "../screens/UserCamera";

//!import of expo and react native modules
import { colors } from "../components/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//!Redux modules import
import store from "../_actions/store";
import { Logout } from "./../_actions/logicHandlerActions/authActions";
import { useSelector } from "react-redux";
import TaxiScreen from "../screens/TaxiScreen";

const Stack = createStackNavigator();
const { white, black } = colors;

const RootStack = () => {
  const isConnected = useSelector((state) => state.auth.isConnected);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Slider"
        screenOptions={{
          headerLeft: (props) => <HeaderBackButton {...props} />,
          headerTintColor: black,
          headerStyle: {
            height: 70,
            borderBottomWidth: 0,
            backgroundColor: white,
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRightContainerStyle: {
            paddingRight: 25,
          },
        }}
      >
        <>
          <Stack.Screen
            name="Slider"
            component={Slider}
            options={{
              headerLeft: () => null,
              headerTitle: "",
            }}
          />

          <Stack.Screen
            name="MainScreen"
            //passing the user and the dahsboard component to the component prop inside a protected route
            component={MainScreen}
            options={{
              headerTitle: "Main Screen",
              headerLeft: () => null,
              //logout button
              headerRight: () =>
                isConnected ? (
                  <Pressable
                    onPress={() => {
                      //logout
                      store.dispatch(Logout());
                    }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={25}
                      color="black"
                    />
                  </Pressable>
                ) : null,
            }}
          />
          <Stack.Screen
            name="Taxi"
            //passing the user and the dahsboard component to the component prop inside a protected route
            component={TaxiScreen}
            options={{
              headerTitle: "Taxi ",
              //show only the back button and no title
              headerStyle: {
                backgroundColor: "transparent",
              },

              headerRight: () =>
                isConnected ? (
                  <Pressable
                    onPress={() => {
                      //logout
                      store.dispatch(Logout());
                    }}
                  >
                    <MaterialCommunityIcons
                      name="logout"
                      size={25}
                      color="black"
                    />
                  </Pressable>
                ) : null,
            }}
          />
          <Stack.Screen
            name="Camera"
            //passing the user and the dahsboard component to the component prop inside a protected route
            component={UserCamera}
            options={{
              //show only the back button and no title
              headerStyle: {
                backgroundColor: "#FFCC00",
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "Login",
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerTitle: "Sign Up",
            }}
          />

          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
            options={{
              headerTitle: "Email Verification",
            }}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerTitle: "Forgot Password",
            }}
          />

          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerTitle: "Reset Password",
            }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginHandler from "./src/Handler/LoginHandler";
import Login from "./src/Scenes/LoginScreen";
import HomeScreen from "./src/Scenes/HomeScreen";
import {StyleSheet} from "react-native";
import ProjectList from "./src/Scenes/ProjectList";

const MainStack = createStackNavigator({ Home: HomeScreen},{headerMode: 'none'});
const ListStack = createStackNavigator({ List: ProjectList},{headerMode: 'none'});
const AuthStack = createStackNavigator({ Login: Login},{headerMode: 'none'});
const Navigation = createSwitchNavigator(
    {
        Main: MainStack,
        List: ListStack,
        Auth: AuthStack,
        User: LoginHandler,
    },
    {
      initialRouteName: 'User'
    },{headerMode: 'none'});

export default class App extends Component {

  render() {
    return (
      <Navigation style={styles.container}/>
    )
  }
}

var styles = StyleSheet.create({
    container: {
        color: '#2c3e50',
    },
})
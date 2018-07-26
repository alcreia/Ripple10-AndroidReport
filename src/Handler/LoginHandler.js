import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from "react-navigation";
import Entypo from 'react-native-vector-icons/Entypo';

import GraphScreen from '../Scenes/GraphScreen';
import HelpScreen from '../Scenes/HelpScreen';
import ProjectScreen from '../Scenes/ProjectScreen';
import LoginScreen from '../Scenes/LoginScreen';

export const SignedIn = createBottomTabNavigator({
    Project: {
        screen: ProjectScreen,
        navigationOptions: {
            tabBarLabel: "Projects",
            tabBarIcon: ({focused, tintColor}) => (
                <Entypo name="list" size={25} color={tintColor}/>
            )
        },
    },
    Graph: {
        screen: GraphScreen,
        navigationOptions: {
            tabBarLabel: "Graph",
            tabBarIcon: ({focused, tintColor}) => (
                <Entypo name="line-graph" size={25} color={tintColor}/>
            )
        },
    },
    Help: {
        screen: HelpScreen,
        navigationOptions: {
            tabBarLabel: "Help",
            tabBarIcon: ({focused, tintColor}) => (
                <Entypo name="cog" size={25} color={tintColor}/>
            )
        },
    }
}, {
    tabBarOptions: {
        activeTintColor: '#006766',
        inactiveTintColor: 'gray',
    }
});

export const SignedOut = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
}, {headerMode: 'none'});

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};
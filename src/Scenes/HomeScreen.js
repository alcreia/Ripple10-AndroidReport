import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation'
import Graph from "./Graph";
import ProjectList from './ProjectList';
import HelpScreen from './HelpScreen';

export default class HomeScreen extends Component{

    render() {
        const Tabs = createBottomTabNavigator({
            Graph: {screen: Graph},
            Projects: {screen: ProjectList},
            Help: {screen: HelpScreen}
        },{
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            },
            animationEnabled: false,
            swipeEnabled: false,
        })

        return(
            <Tabs/>
        )
    }

}

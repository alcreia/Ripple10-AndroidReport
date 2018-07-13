import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation'
import GraphScreen from "./GraphScreen";
import ProjectList from './ProjectList';
import HelpScreen from './HelpScreen';
import Entypo from 'react-native-vector-icons/Entypo';

export default class HomeScreen extends Component{

    render() {
        const Tabs = createBottomTabNavigator({
            Projects: {screen: ProjectList},
            Graph: {screen: GraphScreen},
            Settings: {screen: HelpScreen}
        },{
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) => {
                    const { routeName } = navigation.state;
                    let iconName;
                    if (routeName === 'Graph') {
                        iconName = `line-graph`;
                    } else if (routeName === 'Projects') {
                        iconName = `list`;
                    } else if (routeName === 'Settings') {
                        iconName = `cog`;
                    }

                    // You can return any component that you like here! We usually use an
                    // icon component from react-native-vector-icons
                    return <Entypo name={iconName} size={25} color={tintColor} />;
                },
            }),
            tabBarOptions: {
                activeTintColor: 'darkblue',
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

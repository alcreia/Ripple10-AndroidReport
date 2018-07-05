import React, {Component} from 'react';
import {ScrollView, StyleSheet, Button, AsyncStorage} from 'react-native';
import Graph from "./Graph";


export default class HomeScreen extends Component {

    _userLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login');
    };

    _showList = () => {
        this.props.navigation.navigate('List');
    };

    render() {
        return(
            <ScrollView style={styles.container}>
                <Graph/>
                <Button
                    onPress={this._showList}
                    title="Show list"/>
                <Button
                    onPress={this._userLogout}
                    title="Logout"/>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor:'#fff'
    },
});
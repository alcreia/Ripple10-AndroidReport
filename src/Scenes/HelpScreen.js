import React, {Component} from 'react';
import {ScrollView, StyleSheet, Button, AsyncStorage} from 'react-native';

export default class HelpScreen extends Component {

    _userLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login');
    };

    render() {
        return(
            <ScrollView style={styles.container}>
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
    },
});
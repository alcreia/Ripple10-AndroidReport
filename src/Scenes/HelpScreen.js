import React, {Component} from 'react';
import {ScrollView, StyleSheet, Button} from 'react-native';
import {onSignOut} from '../Handler/Auth'

export default class HelpScreen extends Component {

    _handleSubmit = () => {
        const navigation = this.props.navigation;
        onSignOut().then(navigation.navigate("SignedOut"))
    };

    render() {
        return(
            <ScrollView style={styles.container}>
                <Button
                    onPress={this._handleSubmit}
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
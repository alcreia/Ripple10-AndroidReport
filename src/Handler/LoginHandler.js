import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default class LoginHandler extends React.Component {

	constructor(props) {
		super(props);
		this._bootstrapAsync();
	}

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
    };

	render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
            );
	    }
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#2c3e50',
	},
})
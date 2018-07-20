import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {onSignIn} from '../Handler/Auth';
import Icon from '../images/Icon';

export default class LoginScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    _handleSubmit = () => {
        const navigation = this.props.navigation;
        onSignIn(this.state.username, this.state.password).then(navigation.navigate("SignedIn"));
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.image}>
                    <Icon/>
                </View>
                <View style={{margin: 4}}/>
                <Text
                    style={styles.title}>
                    Welcome Back!
                </Text>
                <View style={{height: 40}}/>
                <TextInput
                    placeholder='Username'
                    placeholderTextColor='#006766'
                    onChangeText={(username) => this.setState({username})}
                    autoCapitalize='none'
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='#006766'
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    style={styles.textInput}
                />
                <View style={{margin: 7}}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._handleSubmit.bind(this)}>
                    <Text
                        style={styles.login}>
                        Login
                    </Text>
                </TouchableOpacity>
                <View style={{margin: 4}}/>
                <Text
                    style={styles.contact}>
                    {`Don't have an account?\nContact Us.`}
                </Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: '#006766',
    },
    image: {
        alignSelf: 'center',
        marginTop: 85,
    },
    title: {
        color: '#ddd',
        textAlign: 'center'
    },
    textInput: {
        color: '#ddd',
        padding: 10,
        paddingLeft: 30,
        borderRadius: 25,
        backgroundColor: '#00000030',
        margin: 5,
    },
    button: {
        backgroundColor: '#ddd',
        borderRadius: 25
    },
    login: {
        textAlign: 'center',
        color: '#006766',
        fontSize: 18,
        padding: 10,
    },
    contact: {
        color: '#ddd',
        textAlign: 'center',
        fontSize: 10,
    },

});
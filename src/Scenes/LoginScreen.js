import React, { Component } from 'react';
import {View, Text, TextInput, Image,
    Button, ScrollView, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: '',
        token:'',
    };

    _userLogin = () => {

        this.setState({ isLoggingIn: true, message: '' });

        let params = {
            username: this.state.username,
            password: this.state.password,
            grant_type: 'password'
        };

        let formBody = [];
        for (let property in params) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("http://apiv2.r10.co/api/v1/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
            .then((response) => response.json())
            .then((response) => {
            if (response.statusCode !== 200) this.setState({message: response.message});
                else {
                    this.setState({token: response.data.token});
                    this._signInAsync();
                    this.setState({ isLoggingIn: false })
                }
            })
            .catch(err => {
                this.setState({ message: err.message });
                this.setState({ isLoggingIn: false });
            })
    }

    _signInAsync = () => {
        AsyncStorage.setItem('userToken',this.state.token);
        this.props.navigation.navigate('HomeScreen')
    };

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ isLoggingIn: false, message: '' });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Image source={require('../images/icon.png')}
                    style={styles.image} />
                <Text 
                    style={styles.title}>
                    Login
                </Text>
                <TextInput
                    placeholder='Username'
                    placeholderTextColor='#ddd'
                    onChangeText={(username) => this.setState({username})}
                    autoFocus={true}
                    autoCapitalize='none'
                    style={styles.textInput}
                />
                <TextInput 
                    ref={component => this._password = component}
                    placeholder='Password'
                    placeholderTextColor='#ddd'
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    autoCapitalize='none'
                    style={styles.textInput}
                    onSubmitEditing={this._userLogin}
                />
                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                        {this.state.message}
                    </Text>
                )}
                {this.state.isLoggingIn && <ActivityIndicator />}
                <View style={{margin:7}} />
                <Button 
                    disabled={this.state.isLoggingIn||!this.state.username||!this.state.password}
                    onPress={this._userLogin}
                    title="Login"
                />
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
   container: {
       padding: 20,
       backgroundColor: '#2c3e50',
   },
   image: {
       alignSelf:'center',
       marginBottom:50,
       marginTop:50,
   },
    title: {
       fontSize: 27,
       color:'#ddd'
   },
    textInput: {
       color:'#ddd'
   },

});
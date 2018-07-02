import React, {Component} from 'react';
import {View, StyleSheet, Button, AsyncStorage} from 'react-native';
import Graph from "./Graph";


export default class HomeScreen extends Component {

    state = {
        source: '',
    };

    componentDidMount() {
        return fetch(
            "http://apiv2.r10.co/api/v1/mentions?project=81&since=2017-03-01&until=2017-03-30" +
            "&service_category=twitter&type=daily&filterbot=false", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEyLDEwMTQsMTAxNSwxMDIzLDEwMjQsMTAyNSwxMDI3LDEwNTQsMTA1OSwxMDY1LDEwNjYsMTA2NywxMDY4LDEwNjksMTEwNiwxMTQ1LDExNDYsMTE0NywxMTYyLDExNjUsMTE2NywxMjQxLDEyODQsMTI4NSwxMjg2LDEyOTIsMTM4LDE2MywxNjQsMTY2LDE3MCwxNzQsMTc2LDIxMywyMzUsMjM4LDIzOSwyNDAsMjc1LDMzOCwzMzksNDc4LDQ3OSw1MTMsNTE0LDU4NCw2NDgsNjk4LDcxOCw3MTksNzIwLDcyMSw4MCw4MDgsODA5LDgxLDgxMiw4Miw4MjAsODIxLDgyMiw5ODQsOTk5XX0sImlhdCI6MTUyNzY5NDkwMCwiZXhwIjoxNTMwMjg2OTAwfQ.uugQolBcvyTMR1V8wqE19ivA3_rXnoqk-MK3oYIwof0"}})
            .then((response) => response.json())
            .then((response) => {
                this.setState({source: response.data});
            })
            .catch((error) => console.error(error))
    };

    _userLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login');
    };

    _showList = () => {
        this.props.navigation.navigate('List');
    };

    render() {
        return(
            <View style={styles.container}>
                <Graph/>
                <Button
                    onPress={this._showList}
                    title="Show list"/>
                <Button
                    onPress={this._userLogout}
                    title="Logout"/>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor:'#fff'
    },
});
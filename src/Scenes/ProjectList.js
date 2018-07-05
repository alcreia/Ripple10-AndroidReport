import React, {Component} from 'react';
import {Text, View, FlatList, Button, AsyncStorage} from 'react-native';

export default class ProjectList extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            list: '',
            message: '',
        }
    };

    _userFetch = () => {

        fetch(
            "http://apiv2.r10.co/api/v1/projects/list?selected_fields=time_add%2Ckey_name%2Ckey_word", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEyLDEwMTQsMTAxNSwxMDIzLDEwMjQsMTAyNSwxMDI3LDEwNTQsMTA1OSwxMDY1LDEwNjYsMTA2NywxMDY4LDEwNjksMTEwNiwxMTQ1LDExNDYsMTE0NywxMTYyLDExNjUsMTE2NywxMjQxLDEyODQsMTI4NSwxMjg2LDEyOTIsMTM4LDE2MywxNjQsMTY2LDE3MCwxNzQsMTc2LDIxMywyMzUsMjM4LDIzOSwyNDAsMjc1LDMzOCwzMzksNDc4LDQ3OSw1MTMsNTE0LDU4NCw2NDgsNjk4LDcxOCw3MTksNzIwLDcyMSw4MCw4MDgsODA5LDgxLDgxMiw4Miw4MjAsODIxLDgyMiw5ODQsOTk5XX0sImlhdCI6MTUzMDUxMDY2MCwiZXhwIjoxNTMzMTAyNjYwfQ.GTNUx0QdRUej7NkkiruCFQhahsSYyKERWhag4nZ04PU"}})
            .then((response) => response.json())
            .then((response) => {
                this.setState({list: response.data});
            })
            .catch((error) => console.error(error))
    };

    _returnHome = () => {
        this.props.navigation.navigate('Main');
    }

    render() {
        return(
            <View>
                <Button
                    onPress={this._userFetch}
                    title="Fetch"/>
                <Button
                    onPress={this._returnHome}
                    title="Return"/>
                <Text>
                    {this.state.message}
                </Text>
                <FlatList
                    data={this.state.list}
                    renderItem={({item}) => <Text>{item.time_add} | {item.key_name} | {item.key_word}</Text>}
                    keyExtractor={(item, index) => item.key_id.toString()}
                />
            </View>
        )
    }

}
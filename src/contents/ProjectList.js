import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import {withNavigation} from 'react-navigation'

class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: '',
        }
    };

    componentDidMount() {
        fetch(
            "https://api.ripple10.com/api/v1/projects/list?selected_fields=time_add%2Ckey_name%2Ckey_word", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEyLDEwMTQsMTAxNSwxMDIzLDEwMjQsMTAyNSwxMDI3LDEwNTQsMTA1OSwxMDY1LDEwNjYsMTA2NywxMDY4LDEwNjksMTEwNiwxMTQ1LDExNDYsMTE0NywxMTYyLDExNjUsMTE2NywxMjM5LDEyNDEsMTI4NCwxMjg1LDEyODYsMTI5MiwxMzgsMTQyOCwxNDM2LDE0NDQsMTQ2MSwxNTc0LDE2MywxNjQsMTY2LDE3MCwxNzEsMTcyLDE3NCwxNzUsMTc2LDIwOCwyMTMsMjI3LDIzNSwyMzgsMjM5LDI0MCwyNzUsMzE3MiwzMTgzLDMxODQsMzE4NSwzMTkwLDMxOTEsMzM4LDMzOSw0NzgsNDc5LDUxMyw1MTQsNTg0LDY0MSw2NDgsNjg4LDY5OCw2OTksNzE4LDcxOSw3MjAsNzIxLDgwLDgwOCw4MDksODEsODEyLDgyLDgyMCw4MjEsODIyLDkwOSw5MjUsOTg0LDk5OV19LCJpYXQiOjE1MzA1MjYzNDgsImV4cCI6MTUzMzExODM0OH0.oD6wHeR3KtWWIgqWC3gWhaV-8e6TCtVVzy9RITODtJI"
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({list: response.data});
            })
            .catch((error) => console.error(error))
    };

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MentionsGraph', {pid: item.key_id})}>
                <ListItem
                    title={item.key_name}
                    subtitle={item.key_word}
                />
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.list}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item.key_id.toString()}
                />
            </View>
        )
    }

}

export default withNavigation(ProjectList);
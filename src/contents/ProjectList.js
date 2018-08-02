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
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEwLDEwMTEsMTAxMiwxMDEzLDEwMTQsMTAyMywxMDI0LDEwMjUsMTAyNywxMDU0LDEwNTksMTA2NSwxMDY2LDEwNjcsMTA2OCwxMDY5LDExMDYsMTE0NSwxMTQ2LDExNDcsMTE2MiwxMTY1LDExNjcsMTIzOSwxMjQxLDEyODQsMTI4NSwxMjg2LDEyOTIsMTM4LDE0MjgsMTQzNiwxNDQ0LDE0NjEsMTU3NCwxNjMsMTY0LDE2NiwxNzAsMTcxLDE3MiwxNzQsMTc1LDE3NiwyMDgsMjEzLDIyNywyMzUsMjM4LDIzOSwyNDAsMjc1LDMxNzIsMzE4MywzMTg0LDMxODUsMzE5MCwzMTkxLDMyMDMsMzIxOCwzMjE5LDMyMjAsMzI0MSwzMzgsMzM5LDQ3OCw0NzksNTEzLDUxNCw1ODQsNjQxLDY0OCw2ODgsNjk4LDY5OSw3MTgsNzE5LDcyMCw3MjEsODA4LDgwOSw4MSw4MTIsODIsODIwLDgyMSw4MjIsOTA5LDkyNSw5ODQsOTk5XX0sImlhdCI6MTUzMzExOTU3NSwiZXhwIjoxNTM1NzExNTc1fQ.XRwz4Wm87gM4l7_CcjKxWKMPCSqPLkvXe0QlYHQX8H4"
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Graph', {pid: item.key_id, name: item.key_name})}>
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
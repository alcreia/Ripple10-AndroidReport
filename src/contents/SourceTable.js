import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';

export default class SourceGraph extends Component {

    state = {
        source: '',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEwLDEwMTEsMTAxMiwxMDEzLDEwMTQsMTAyMywxMDI0LDEwMjUsMTAyNywxMDU0LDEwNTksMTA2NSwxMDY2LDEwNjcsMTA2OCwxMDY5LDExMDYsMTE0NSwxMTQ2LDExNDcsMTE2MiwxMTY1LDExNjcsMTIzOSwxMjQxLDEyODQsMTI4NSwxMjg2LDEyOTIsMTM4LDE0MjgsMTQzNiwxNDQ0LDE0NjEsMTU3NCwxNjMsMTY0LDE2NiwxNzAsMTcxLDE3MiwxNzQsMTc1LDE3NiwyMDgsMjEzLDIyNywyMzUsMjM4LDIzOSwyNDAsMjc1LDMxNzIsMzE4MywzMTg0LDMxODUsMzE5MCwzMTkxLDMyMDMsMzIxOCwzMjE5LDMyMjAsMzI0MSwzMzgsMzM5LDQ3OCw0NzksNTEzLDUxNCw1ODQsNjQxLDY0OCw2ODgsNjk4LDY5OSw3MTgsNzE5LDcyMCw3MjEsODA4LDgwOSw4MSw4MTIsODIsODIwLDgyMSw4MjIsOTA5LDkyNSw5ODQsOTk5XX0sImlhdCI6MTUzMzExOTU3NSwiZXhwIjoxNTM1NzExNTc1fQ.XRwz4Wm87gM4l7_CcjKxWKMPCSqPLkvXe0QlYHQX8H4',
    };

    _fetchData = () => {

        fetch(
            `https://api.ripple10.com/api/v1/mentions/composition?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source: response.data});
            })
            .catch((error) => alert(error))
    };

    componentWillUnmount() {
        this.setState({source: ''})
    }



    render() {

        this._fetchData();

        return (

            <View>
            <FlatList
                    dataSource={this.state.source}
                    renderRow={this.renderRow}/>
            </View>

        );
    }
}

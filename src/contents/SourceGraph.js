import React, {Component} from 'react';
import ChartView from 'react-native-highcharts';
import {View, AsyncStorage} from "react-native";

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
                    "Authorization": this.state.token,
                }
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.setState({source: response.data});
            })
            .catch((error) => alert(error))
    };

    componentWillUnmount() {
        this.setState({source: ''})
    }

/*    async _fetchToken() {
        try {
            await AsyncStorage.getItem('userToken')
                .then((value) => {
                    console.log(value)
                })
        } catch (e) {
            console.log(e)
        }
    }
*/

    render() {

        this._fetchData();

        for (var i = 0; i < this.state.source.length; i++) {
            delete this.state.source[i]['negative'];
            delete this.state.source[i]['positive'];
            delete this.state.source[i]['neutral'];
            this.state.source[i]['y'] = this.state.source[i]['total'];
            delete this.state.source[i]['total'];
        }

        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'pie',
                marginRight: 10,
            },
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: false,
            },
            title: {
                text: 'Source of Mention',
            },
            series: [{
                name: 'Mentions',
                data: this.state.source,
            }]
        };

        return (
            <View>
                <ChartView style={{height: 300, borderWidth: 2, borderColor: '#006766'}} config={conf}/>
            </View>
        );
    }
}

import React, {Component} from 'react';
import {View} from 'react-native';
import ChartView from 'react-native-highcharts';
import _ from 'lodash';

export default class SentimentGraph extends Component {

    state = {
        sourcePos: '',
        sourceNeg: '',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEwLDEwMTEsMTAxMiwxMDEzLDEwMTQsMTAyMywxMDI0LDEwMjUsMTAyNywxMDU0LDEwNTksMTA2NSwxMDY2LDEwNjcsMTA2OCwxMDY5LDExMDYsMTE0NSwxMTQ2LDExNDcsMTE2MiwxMTY1LDExNjcsMTIzOSwxMjQxLDEyODQsMTI4NSwxMjg2LDEyOTIsMTM4LDE0MjgsMTQzNiwxNDQ0LDE0NjEsMTU3NCwxNjMsMTY0LDE2NiwxNzAsMTcxLDE3MiwxNzQsMTc1LDE3NiwyMDgsMjEzLDIyNywyMzUsMjM4LDIzOSwyNDAsMjc1LDMxNzIsMzE4MywzMTg0LDMxODUsMzE5MCwzMTkxLDMyMDMsMzIxOCwzMjE5LDMyMjAsMzI0MSwzMzgsMzM5LDQ3OCw0NzksNTEzLDUxNCw1ODQsNjQxLDY0OCw2ODgsNjk4LDY5OSw3MTgsNzE5LDcyMCw3MjEsODA4LDgwOSw4MSw4MTIsODIsODIwLDgyMSw4MjIsOTA5LDkyNSw5ODQsOTk5XX0sImlhdCI6MTUzMzExOTU3NSwiZXhwIjoxNTM1NzExNTc1fQ.XRwz4Wm87gM4l7_CcjKxWKMPCSqPLkvXe0QlYHQX8H4',
    };

    _fetchPositive = () => {

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&type=daily&section=positive&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token}})
            .then((response) => response.json())
            .then((response) => {
                this.setState({sourcePos: response.data});
            })
            .catch((error) => alert(error))
    };

    _fetchNegative = () => {

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&type=daily&section=negative&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token}})
            .then((response) => response.json())
            .then((response) => {
                this.setState({sourceNeg: response.data});
            })
            .catch((error) => alert(error))
    };

    componentWillUnmount() {
        this.setState({sourcePos:'', sourceNeg:''})
    }

    render() {

        this._fetchPositive();
        this._fetchNegative();

        let myPosArray = _.map(this.state.sourcePos, 'count');
        let myNegArray = _.map(this.state.sourceNeg, 'count');
        let myDates = _.map(this.state.sourcePos, 'date');

        var Highcharts = 'Highcharts';
        var opt = {
            colors: ['#00E600', '#FF0000']
        };
        var conf = {
            chart: {
                type: 'spline',
                marginRight: 10,
            },
            title: {
                text: 'Sentiment',
            },
            xAxis: {
                type: 'linear',
                categories: myDates,
            },
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: false,
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            series: [{
                name: 'Positive',
                data: myPosArray,
            },{
                name: 'Negative',
                data: myNegArray,
            }]
        };

        return (
            <View>
                <ChartView style={{height: 300}} config={conf} options={opt}/>
            </View>
        );
    }
}

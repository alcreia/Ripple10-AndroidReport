import React, {Component} from 'react';
import {View} from 'react-native';
import ChartView from 'react-native-highcharts';
import _ from 'lodash';

export default class MentionsGraph extends Component {

    state = {
        source1: '',
        source2: '',
        source3: '',
        source4: '',
        source5: '',
        source6: '',
        source7: '',
        source8: '',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEwLDEwMTEsMTAxMiwxMDEzLDEwMTQsMTAyMywxMDI0LDEwMjUsMTAyNywxMDU0LDEwNTksMTA2NSwxMDY2LDEwNjcsMTA2OCwxMDY5LDExMDYsMTE0NSwxMTQ2LDExNDcsMTE2MiwxMTY1LDExNjcsMTIzOSwxMjQxLDEyODQsMTI4NSwxMjg2LDEyOTIsMTM4LDE0MjgsMTQzNiwxNDQ0LDE0NjEsMTU3NCwxNjMsMTY0LDE2NiwxNzAsMTcxLDE3MiwxNzQsMTc1LDE3NiwyMDgsMjEzLDIyNywyMzUsMjM4LDIzOSwyNDAsMjc1LDMxNzIsMzE4MywzMTg0LDMxODUsMzE5MCwzMTkxLDMyMDMsMzIxOCwzMjE5LDMyMjAsMzI0MSwzMzgsMzM5LDQ3OCw0NzksNTEzLDUxNCw1ODQsNjQxLDY0OCw2ODgsNjk4LDY5OSw3MTgsNzE5LDcyMCw3MjEsODA4LDgwOSw4MSw4MTIsODIsODIwLDgyMSw4MjIsOTA5LDkyNSw5ODQsOTk5XX0sImlhdCI6MTUzMzExOTU3NSwiZXhwIjoxNTM1NzExNTc1fQ.XRwz4Wm87gM4l7_CcjKxWKMPCSqPLkvXe0QlYHQX8H4',
    };

    _fetchData = () => {

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&service_category=1&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source1: response.data});
            })
            .catch((error) => alert(error));

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&service_category=2&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source2: response.data});
            })
            .catch((error) => alert(error));

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&service_category=3&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source3: response.data});
            })
            .catch((error) => alert(error));

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&service_category=4&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source4: response.data});
            })
            .catch((error) => alert(error));

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&service_category=5&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source5: response.data});
            })
            .catch((error) => alert(error));

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&service_category=6&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source6: response.data});
            })
            .catch((error) => alert(error));

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&service_category=7&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source7: response.data});
            })
            .catch((error) => alert(error));

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.props.pid}&since=${this.props.start}&until=${this.props.end}` +
            `&service_category=8&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token
                }
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({source8: response.data});
            })
            .catch((error) => alert(error));
    };

    componentWillUnmount() {
        this.setState({source: ''})
    }

    generalizeArray = (data) => {

        if (data.length > 0) {
            let dates = _.map(data, 'date');
            let counts = _.map(data, 'count');
            return _.zip(dates, counts);
        }
    };

    render() {

        this._fetchData();
        let array1 = this.generalizeArray(this.state.source1);
        let array2 = this.generalizeArray(this.state.source2);
        let array3 = this.generalizeArray(this.state.source3);
        let array4 = this.generalizeArray(this.state.source4);
        let array5 = this.generalizeArray(this.state.source5);
        let array6 = this.generalizeArray(this.state.source6);
        let array7 = this.generalizeArray(this.state.source7);
        let array8 = this.generalizeArray(this.state.source8);


        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'spline',
                marginRight: 10,
            },
            title: {
                text: 'Number of Mentions',
            },
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: false,
            },
            xAxis: {
                type: 'category',

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
                name: 'Facebook',
                data: array1,
            }, {
                name: 'Twitter',
                data: array2,
            }, {
                name: 'Blogspot',
                data: array3,
            }, {
                name: 'Forum',
                data: array4,
            }, {
                name: 'News',
                data: array5,
            }, {
                name: 'YouTube',
                data: array6,
            }, {
                name: 'Instagram',
                data: array7,
            }, {
                name: 'Other',
                data: array8,
            }]
        };

        return (
            <View>
                <ChartView style={{height: 300, borderWidth: 2, borderColor: '#006766'}} config={conf}/>
            </View>
        );
    }
}

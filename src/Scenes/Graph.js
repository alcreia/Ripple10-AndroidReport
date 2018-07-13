import React, {Component} from 'react';
import {Picker, Button, ScrollView, Text} from 'react-native';
import ChartView from 'react-native-highcharts';
import moment from 'moment';
import _ from 'lodash';

export default class Graph extends Component {

    state = {
        source: '',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEyLDEwMTQsMTAxNSwxMDIzLDEwMjQsMTAyNSwxMDI3LDEwNTQsMTA1OSwxMDY1LDEwNjYsMTA2NywxMDY4LDEwNjksMTEwNiwxMTQ1LDExNDYsMTE0NywxMTYyLDExNjUsMTE2NywxMjM5LDEyNDEsMTI4NCwxMjg1LDEyODYsMTI5MiwxMzgsMTQyOCwxNDM2LDE0NDQsMTQ2MSwxNTc0LDE2MywxNjQsMTY2LDE3MCwxNzEsMTcyLDE3NCwxNzUsMTc2LDIwOCwyMTMsMjI3LDIzNSwyMzgsMjM5LDI0MCwyNzUsMzE3MiwzMTgzLDMxODQsMzE4NSwzMTkwLDMxOTEsMzM4LDMzOSw0NzgsNDc5LDUxMyw1MTQsNTg0LDY0MSw2NDgsNjg4LDY5OCw2OTksNzE4LDcxOSw3MjAsNzIxLDgwLDgwOCw4MDksODEsODEyLDgyLDgyMCw4MjEsODIyLDkwOSw5MjUsOTg0LDk5OV19LCJpYXQiOjE1MzA1MjYzNDgsImV4cCI6MTUzMzExODM0OH0.oD6wHeR3KtWWIgqWC3gWhaV-8e6TCtVVzy9RITODtJI',
        startDate: moment(new Date()).subtract(7, 'days').format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD"),
        message: '',
        value: '3',
        pid: '81',
    };

    _fetchData = () => {

        fetch(
            `https://api.ripple10.com/api/v1/mentions?project=${this.state.pid}&since=${this.state.startDate}&until=${this.state.endDate}` +
            `&type=daily&filterbot=false`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.state.token}})
            .then((response) => response.json())
            .then((response) => {
                this.setState({source: response.data, message:response.message});
            })
            .catch((error) => console.error(error))
    };

    onValueChange = (value) => {
        this.setState({value: value});

        if (this.state.value === '1') {
            this.setState({
                startDate: moment(new Date()).format("YYYY-MM-DD"),
                endDate: moment(new Date()).format("YYYY-MM-DD")
            })
        } else if (this.state.value === '2') {
            this.setState({
                startDate: moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD"),
                endDate: moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")
            })
        } else if (this.state.value === '3') {
            this.setState({
                startDate: moment(new Date()).subtract(7, 'days').format("YYYY-MM-DD"),
                endDate: moment(new Date()).format("YYYY-MM-DD")
            })
        } else if (this.state.value === '4') {
            this.setState({
                startDate: moment(new Date()).subtract(30, 'days').format("YYYY-MM-DD"),
                endDate: moment(new Date()).format("YYYY-MM-DD")
            })
        } else if (this.state.value === '5') {
            this.setState({
                startDate: moment(new Date()).startOf('month').format("YYYY-MM-DD"),
                endDate: moment(new Date()).format("YYYY-MM-DD")
            })
        } else if (this.state.value === '6') {
            this.setState({
                startDate: moment(new Date()).subtract(1, 'month').startOf('month').format("YYYY-MM-DD"),
                endDate: moment(new Date()).subtract(1, 'month').endOf('month').format("YYYY-MM-DD")
            })
        }
    }

    render() {

        this._fetchData();

        let myArray = _.map(this.state.source, 'count');
        let myDates = _.map(this.state.source, 'date');

        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'spline',
                marginRight: 10,
            },
            title: {
                text: 'Number of Mentions',
            },
            xAxis: {
                type: 'linear',
                categories: myDates,
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
                name: 'Twitter',
                data: myArray,
            }]
        };

        return (
            <ScrollView>
                <ChartView style={{height: 300}} config={conf}>
                </ChartView>
                <Text>
                    {this.state.message}
                </Text>
                <Picker
                    selectedValue={(this.value && this.state.value) || '3'}
                    onValueChange={(itemValue) => this.onValueChange(itemValue)}>
                    <Picker.Item label="Today" value='1'/>
                    <Picker.Item label="Yesterday" value='2'/>
                    <Picker.Item label="Last 7 Days" value='3'/>
                    <Picker.Item label="Last 30 Days" value='4'/>
                    <Picker.Item label="This Month" value='5'/>
                    <Picker.Item label="Last Month" value='6'/>
                </Picker>
                <Button
                    onPress={this._fetchData}
                    title='Refresh'>
                </Button>
            </ScrollView>


        );
    }
}

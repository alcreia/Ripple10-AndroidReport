import React, {Component} from 'react';
import {Picker, Button, ScrollView, Text} from 'react-native';
import ChartView from 'react-native-highcharts';
import _ from 'lodash';

export default class SourceGraph extends Component {

    state = {
        source: '',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVpZCI6NTIsImRhdGEiOlsxMDEyLDEwMTQsMTAxNSwxMDIzLDEwMjQsMTAyNSwxMDI3LDEwNTQsMTA1OSwxMDY1LDEwNjYsMTA2NywxMDY4LDEwNjksMTEwNiwxMTQ1LDExNDYsMTE0NywxMTYyLDExNjUsMTE2NywxMjM5LDEyNDEsMTI4NCwxMjg1LDEyODYsMTI5MiwxMzgsMTQyOCwxNDM2LDE0NDQsMTQ2MSwxNTc0LDE2MywxNjQsMTY2LDE3MCwxNzEsMTcyLDE3NCwxNzUsMTc2LDIwOCwyMTMsMjI3LDIzNSwyMzgsMjM5LDI0MCwyNzUsMzE3MiwzMTgzLDMxODQsMzE4NSwzMTkwLDMxOTEsMzM4LDMzOSw0NzgsNDc5LDUxMyw1MTQsNTg0LDY0MSw2NDgsNjg4LDY5OCw2OTksNzE4LDcxOSw3MjAsNzIxLDgwLDgwOCw4MDksODEsODEyLDgyLDgyMCw4MjEsODIyLDkwOSw5MjUsOTg0LDk5OV19LCJpYXQiOjE1MzA1MjYzNDgsImV4cCI6MTUzMzExODM0OH0.oD6wHeR3KtWWIgqWC3gWhaV-8e6TCtVVzy9RITODtJI',
    };

    _fetchData = () => {

        fetch(
            `https://api.ripple10.com/api/v1/mentions/composition?project=${this.props.pid}&since=${this.props.startDate}&until=${this.props.endDate}` +
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

        let myArray = _.map(this.state.source, 'count');
        let myDates = _.map(this.state.source, 'date');

        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'pie',
                marginRight: 10,
            },
            title: {
                text: 'Source of Mention',
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
            <ChartView style={{height: 300}} config={conf}/>
        );
    }
}

import React, { Component } from 'react';
import {View, FlatList, Text} from 'react-native';
import ChartView from 'react-native-highcharts';

export default class Graph extends Component {

    state = {
        source:''
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
                this.setState({source: response.data})
                /*let series = this.series[0];
                for (let i = 0; i< this.state.source.length; i++) {
                    var x = this.state.source.date,
                        y = this.state.source.count;
                    series.addPoint([x,y],true,true);
                }*/
            })
            .catch((error) => console.error(error))
    };

    render() {

        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'spline',
                marginRight: 30,
            },
            title: {
                text: 'Number of Mentions',
            },
            xAxis: {
                type: 'linear',
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
                data: function () {
                    var data = [];
                    var i;
                    for (i = 0; i < 5; i++) {
                        data.push({
                            x: i,
                            y: i
                        })
                    }
                    return data;
                },
            }]
        };

        return(
            <View>
                <ChartView style={{height: 300}} config={conf}>
                </ChartView>
                <FlatList
                    data={this.state.source}
                    renderItem={({item}) => <Text>{item.date}, {item.count}</Text>}
                    keyExtractor={item => item.date}
                />
            </View>


        );
    }
}

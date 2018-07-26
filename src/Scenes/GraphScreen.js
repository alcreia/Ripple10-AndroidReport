import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import MentionsGraph from '../contents/MentionsGraph'
import SetDatePicker from "../contents/SetDatePicker";
import moment from "moment";
import SentimentGraph from "../contents/SentimentGraph";
import SourceGraph from "../contents/SourceGraph";

export default class GraphScreen extends Component {

    state = {
        startDate: moment(new Date()).subtract(7, 'days').format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD"),
        value: '3'
    };

    dateCallback = (start, end, val) => {
        this.setState({
            startDate: start,
            endDate: end,
            value: val
        })
    };

    render() {

        const pid = this.props.navigation.getParam('pid', '80');
        const name = this.props.navigation.getParam('name', null);
        const {startDate, endDate} = this.state;
        return (
            <ScrollView style={styles.container}>
                <Text>
                    Buzz Monitoring {name}
                </Text>
                <SetDatePicker callbackFromParent={this.dateCallback} value={this.state.value}/>
                <MentionsGraph pid={pid} start={startDate} end={endDate}/>
                <SourceGraph pid={pid} start={startDate} end={endDate}/>
                <SentimentGraph pid={pid} start={startDate} end={endDate}/>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
import React, {Component} from 'react';
import {Picker} from 'react-native';
import moment from 'moment';

export default class SetDatePicker extends Component {

    state = {
        startPicker: false,
        endPicker: false
    }

    onValueChange = (value) => {

        let startDate, endDate;

        if (value === '1') {
            startDate = moment(new Date()).format("YYYY-MM-DD");
            endDate = moment(new Date()).format("YYYY-MM-DD");
        } else if (value === '2') {
            startDate = moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD");
            endDate = moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD");
        } else if (value === '3') {
            startDate = moment(new Date()).subtract(7, 'days').format("YYYY-MM-DD");
            endDate = moment(new Date()).format("YYYY-MM-DD");
        } else if (value === '4') {
            startDate = moment(new Date()).subtract(30, 'days').format("YYYY-MM-DD");
            endDate = moment(new Date()).format("YYYY-MM-DD");
        } else if (value === '5') {
            startDate = moment(new Date()).startOf('month').format("YYYY-MM-DD");
            endDate = moment(new Date()).format("YYYY-MM-DD");
        } else if (value === '6') {
            startDate = moment(new Date()).subtract(1, 'month').startOf('month').format("YYYY-MM-DD");
            endDate = moment(new Date()).subtract(1, 'month').endOf('month').format("YYYY-MM-DD");
        }

        this.props.callbackFromParent(startDate, endDate, value);
    };

    render() {
        return (
            <Picker
                selectedValue={this.props.value}
                onValueChange={(itemValue) => this.onValueChange(itemValue)}>
                <Picker.Item label="Today" value='1'/>
                <Picker.Item label="Yesterday" value='2'/>
                <Picker.Item label="Last 7 Days" value='3'/>
                <Picker.Item label="Last 30 Days" value='4'/>
                <Picker.Item label="This Month" value='5'/>
                <Picker.Item label="Last Month" value='6'/>
            </Picker>
        )
    }
}
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Graph from './Graph'

export default class HelpScreen extends Component {


    render() {
        return(
            <ScrollView style={styles.container}>
                <Graph/>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
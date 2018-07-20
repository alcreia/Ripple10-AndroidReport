import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MentionsGraph from '../contents/MentionsGraph'

export default class GraphScreen extends Component {

    render() {

        const pid = this.props.navigation.getParam('pid','80');
        return(
            <ScrollView style={styles.container}>
                <MentionsGraph pid={pid}/>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
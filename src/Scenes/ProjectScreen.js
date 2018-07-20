import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import ProjectList from '../contents/ProjectList'

export default class ProjectScreen extends Component {

    render() {

        return(
            <ScrollView>
                <ProjectList/>
            </ScrollView>
        )
    }
}

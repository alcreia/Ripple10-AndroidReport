import React, { Component } from 'react';
import {isSignedIn} from "./src/Handler/Auth";
import {createRootNavigator} from "./src/Handler/LoginHandler";
export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false,
        }
    };

    componentDidMount() {
        isSignedIn()
            .then(res => this.setState({signedIn: res, checkedSignIn: true}))
            .catch(err => alert("Error"));
    }

    render() {
        const {checkedSignIn, signedIn} = this.state;

        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);
        return <Layout/>
    }
}

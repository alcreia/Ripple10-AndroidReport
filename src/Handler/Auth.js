import {AsyncStorage} from "react-native";

export const onSignIn = async (user, pass) => {
   let params = {
        username: user,
        password: pass,
    };
    let formBody = [];
    for (let property in params) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let token = '';

    fetch("https://api.ripple10.com/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
        .then((response) => response.json())
        .then((response) => {
            token = response.data.token
        })
        .catch(err => {
            alert("Wrong username or password")
        });

    token = 'Bearer ' + token;
    try {
        await AsyncStorage.setItem('userToken', token)
    } catch (e) {
        console.log(e)
    }

};

export const onSignOut = () => AsyncStorage.removeItem('userToken');

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('userToken')
            .then(res => {
                if (res !== null) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
            .catch(err => {
                reject(err)
            })
    });
};
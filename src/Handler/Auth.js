import {AsyncStorage} from "react-native";

export const USER_TOKEN = "userToken";

function _signIn(user, pass) {
    let params = {
        username: user,
        password: pass,
        grant_type: 'password'
    };

    let formBody = [];
    for (let property in params) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://api.ripple10.com/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.statusCode === 200) {
                AsyncStorage.setItem(USER_TOKEN, `Bearer ${response.token}`);
            }
        })
        .catch(err => {
            alert("Wrong username or password")
        });
}

export const onSignIn = (user, pass) => _signIn(user, pass);

export const onSignOut = () => AsyncStorage.removeItem(USER_TOKEN);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_TOKEN)
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
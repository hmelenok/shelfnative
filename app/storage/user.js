import {AsyncStorage} from "react-native";
import Meteor from "react-native-meteor";
import {Actions} from "react-native-router-flux";
export default class UserStorage {
    getUser(cb) {
        AsyncStorage.getItem('user', (err, result) => {
            cb(JSON.parse(result));
        })
            .catch(e => {
                console.error(e);
                cb(false);
            });
    }

    setUser(meteorUser) {
        console.log('setUser');
        AsyncStorage.setItem('user', JSON.stringify(meteorUser));
    }

    clearUser() {
        AsyncStorage.removeItem('user', null);
        this.getUser((user)=>{
            console.log('user cleared', user);
        });
    }

    logout() {
        Meteor.logout();
        this.clearUser();
        Actions.auth();
    }
}

module.exports = UserStorage;
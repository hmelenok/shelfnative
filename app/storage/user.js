/**
 * Created by hmelenok on 11/9/16.
 */
import {AsyncStorage} from "react-native";

export default class UserStorage {
    getUser(cb) {
        AsyncStorage.getItem('user', (err, result) => {
            console.log(err, result);
            cb(JSON.parse(result));
        })
            .catch(e => {
                console.error(e);
                cb(false);
            });
    }
    setUser(meteorUser) {
            AsyncStorage.setItem('shares', JSON.stringify(meteorUser));
    }
}

module.exports = UserStorage;
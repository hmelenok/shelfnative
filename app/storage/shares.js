/**
 * Created by hmelenok on 11/9/16.
 */
import {AsyncStorage} from "react-native";
import _ from "lodash";

export default class SharesStorage {
    getItems(cb) {
        AsyncStorage.getItem('shares', (err, result) => {
            console.log(err, result);
            cb(JSON.parse(result));
        })
            .catch(e => {
                console.error(e);
                cb(false);
            });
    }

    add(share) {
        this.getItems((currentShares) => {
            newShares = _.uniqBy(_.union(currentShares, [share]), 'data');
            AsyncStorage.setItem('shares', JSON.stringify(newShares));
        });

    }
}

module.exports = SharesStorage;
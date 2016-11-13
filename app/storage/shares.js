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

    setItems(newShares, cb = false) {
        AsyncStorage.setItem('shares', JSON.stringify(newShares));
        if (cb) {
            cb(true);
        }
    }

    add(share, done = false) {
        this.getItems((currentShares) => {
            this.setItems(_.uniqBy(_.union(currentShares || [], [share]), 'data'),
                () => done && done());
        });

    }

    removeByData(share, done) {
        this.getItems((currentShares) => {
            this.setItems(_.uniqBy(_.reject(currentShares, {'data': share.data}), 'data'),
                () => done(true));
        });
    }
}

module.exports = SharesStorage;
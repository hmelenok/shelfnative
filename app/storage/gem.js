import uuid from "uuid";
import _ from "lodash";
import Meteor from "react-native-meteor";

export default class Gem {
    constructor() {
        this._id = uuid.v4();
        this.path = false;
        this.badge = 'No Badge';
        this.meta = {
            creationSource: 'shelfnative',
            creationType: 'single',
            creationLocation: 'android'
        };
    }

    getFilled() {
        return _.omitBy(_.cloneDeep(this), _.isUndefined);
    }

    setFolder(path) {
        this.path = path + ',';
    }

    setTransactionId(transactionId) {
        this.transactionId = transactionId;
    }

    getUploadUrl(name, mime, callback) {
        if (typeof callback === 'function') {
            Meteor
                .call('api/upload-link/get', {
                    gemId: this._id,
                    mime,
                    name
                })
                .result
                .then(amazonObj => {
                    callback(false, amazonObj);
                })
                .catch(error => {
                    console.error(error);
                    callback(error, false);
                });
        } else {
            console.warn('Please specify callback');
        }
    }

    /**
     * Insert gem into database collection with optional comment
     * @param {String} [comment] Comment to attach to gem
     * @param {function} [cb] async callback (error, result)
     */
    insert(comment = '', cb) {
        if (Meteor.userId() && Meteor.user()) {
            this.accountId = Meteor.user().account.id;
            this.ownerId = Meteor.userId();
            this.setFolder(',' + Meteor.user().personalGroupId);

            Meteor
                .call('GS.Gems.Methods.insertGemWithComment', this.getFilled(), comment, (error, result) => {
                    cb(error, result);
                });
        } else {
            throw Error('You should be logged in')
        }
    }

    blobify(base64String, mimeType) {
        const binary = atob(base64String.replace(/\-/g, '+').replace(/\_/g, '/'));
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mimeType});
    }

    putToS3(url, data, callback = _.noop) {
        fetch(url, {
            method: 'PUT',
        });
        // $.ajax({
        //     type: 'PUT',
        //     processData: false,
        //     contentType: _.get(this, 'meta.mimeType', 'application/octet-stream'),
        //     url,
        //     data
        // }).then((___, status) => {
        //     if (status !== 'success') {
        //         return console.warn('[putToS3]', status);
        //     }
        //
        //     return callback(true);
        // }).catch(error => {
        //     if (error) {
        //         console.warn('[putToS3]', error);
        //     }
        //
        //     return callback(false);
        // });
    }
}

module.exports = Gem;

import Config from "react-native-config";
import {get, isEmpty, isString, merge, keys} from "lodash";
import {AsyncStorage, ToastAndroid} from "react-native";
const gmailAPIEndpoint = Config.SHELF_API_GMAIL_ENDPOINT;
const authAPIEndpoint = Config.SHELF_API_AUTH_ENDPOINT;
const gemsAPIEndpoint = Config.SHELF_API_GEMS_ENDPOINT;
const searchAPIEndpoint = Config.SHELF_API_SEARCH_ENDPOINT;

export const authURL = `${authAPIEndpoint}/v1/auth`;
export const revokeURL = `${authAPIEndpoint}/v1/revoke`;
export const userDataURL = `${authAPIEndpoint}/v1/user`;
export const treeURL = `${gemsAPIEndpoint}/v1/tree`;
export const publicShareURL = `${gemsAPIEndpoint}/v1/public-share`;
export const gemCreateURL = `${gemsAPIEndpoint}/v1/create`;
export const getAuthURLURL = `${gmailAPIEndpoint}/v1/gmail/auth-url`;
export const getThreadsURL = `${gmailAPIEndpoint}/v1/gmail/users/threads/get`;
export const getThreadMessagesURL = `${gmailAPIEndpoint}/v1/gmail/users/messages/get`;
export const getAttachmentsURL = `${gmailAPIEndpoint}/v1/gmail/users/messages/attachments/get`;
export const searchURL = `${searchAPIEndpoint}/v1/gems`;
export const hatracksURL = `${searchAPIEndpoint}/v1/hatracks`;
/**
 * Invokes fetch with authorization header containing a token
 * Throws on any non 2XX response status code
 * @param {String} url URL for making a request
 * @param {Object} additionalOptions - can change a way of request to POST
 * and add additional headers
 * @return {Promise.<Object>} JSON object with response
 */
export function makeAuthorizedRequest(url, additionalOptions = {}) {
    return getAuthToken()
        .then(authToken => {
            const fetchOptions = merge({
                headers: {Authorization: authToken},
                mode: 'cors'
            }, additionalOptions);
            return fetch(url, fetchOptions)
                .then(handleFetchErrors)
                .then(resp => resp.json());
        });
}

/**
 * Get Auth token from local storage for using in Shelf API
 * @return {Promise.<String>} Token string
 */
export function getAuthToken() {
    return new Promise(resolve => {
        AsyncStorage.getItem('authToken', (err, token) => {
            ToastAndroid.show(
                err,
                ToastAndroid.SHORT
            );
            resolve(token);
        });
    });
}


/**
 * Helper function to throw error on non 200 status codes
 * @param {Object} response Fetch response object
 * @return {Promise.<Object>} Fetch response object
 */
export function handleFetchErrors(response) {
    if (!response.ok) {
        const errorMessage = get(JSON.parse(response._bodyText), 'error.message');
        if (isString(errorMessage) && !isEmpty(errorMessage)) {
            ToastAndroid.show(
                errorMessage,
                ToastAndroid.SHORT
            );
            throw Error(errorMessage);
        }
    }

    return response;
}

export function obtainAuthToken(email, password) {
    const options = {
        method: 'POST',
        body: JSON.stringify({email, password}),
        mode: 'cors'
    };
    return fetch(authURL, options)
        .then(handleFetchErrors)
        .then(resp => resp.json())
        .then(resp => resp.token)
        .then(token => {
            return new Promise(resolve => {
                if (token) {
                    return AsyncStorage.setItem('authToken', token);
                }

                return resolve(token);
            });
        });
}

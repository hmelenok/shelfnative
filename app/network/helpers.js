import { get, isEmpty, isString, merge } from 'lodash';
import {AsyncStorage} from "react-native";

/**
 * Invokes fetch with authorization header containing a token
 * Throws on any non 2XX response status code
 * @param {String} url URL for making a request
 * @param {Object} additionalOptions - can change a way of request to POST
 * and add additional headers
 * @return {Promise.<Object>} JSON object with response
 */
export async function makeAuthorizedRequest(url, additionalOptions = {}) {
    const authToken = await getAuthToken();
    const fetchOptions = merge({
        headers: {Authorization: authToken},
        mode: 'cors'
    }, additionalOptions);
    return fetch(url, fetchOptions)
        .then(handleFetchErrors)
        .then(resp => resp.json());
}

/**
 * Get Auth token from local storage for using in Shelf API
 * @return {Promise.<String>} Token string
 */
export function getAuthToken() {
    return new Promise(resolve => {
        AsyncStorage.getItem('authToken',(err, token) => {
            resolve(token);
        });
    });
}


/**
 * Helper function to throw error on non 200 status codes
 * @param {Object} response Fetch response object
 * @return {Promise.<Object>} Fetch response object
 */
export async function handleFetchErrors(response) {
    if (!response.ok) {
        const responseJson = await response.json();
        const errorMessage = get(responseJson, 'error.message', response.statusText);
        if (isString(errorMessage) && !isEmpty(errorMessage)) {
            throw Error(errorMessage);
        }
    }

    return response;
}


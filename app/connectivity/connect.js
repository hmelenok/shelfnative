/**
 * Created by hmelenok on 25.10.16.
 */
import Meteor from 'react-native-meteor';

export default function() {
    const url = 'https://app.shelf.io/websocket';
    Meteor.connect(url);
}
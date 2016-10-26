/**
 * Created by hmelenok on 25.10.16.
 */
import Meteor from 'react-native-meteor';

export default function() {
    Meteor.connect('wss://app.shelf.io/websocket');
}
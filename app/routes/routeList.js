/**
 * Created by hmelenok on 25.10.16.
 */
import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const ROUTE_LIST = [
    { name: 'Meteor Connection', route: 'auth' },
    { name: 'Accounts', route: 'connecting' },
    { name: 'Meteor List View', route: 'share' },
];
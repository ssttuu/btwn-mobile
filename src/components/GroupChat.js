import React, {Component} from 'react';
import {Text, View} from "react-native";
import {connect} from 'react-redux';

class GroupChat extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>
                    Group Chat
                </Text>
            </View>
        );
    }
}

export default GroupChat;

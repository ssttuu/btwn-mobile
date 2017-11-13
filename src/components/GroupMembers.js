import React, {Component} from 'react';
import {Text, View} from "react-native";
import {connect} from 'react-redux';

class GroupMembers extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>
                    Group Members
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(GroupMembers);

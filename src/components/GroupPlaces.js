import React, {Component} from 'react';
import {Text, View} from "react-native";
import {connect} from 'react-redux';
import {MapView} from "expo";

class GroupPlaces extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>
                    Group Places
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(GroupPlaces);

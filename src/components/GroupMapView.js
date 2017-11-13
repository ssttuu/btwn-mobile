import React, {Component} from 'react';
import {Text, View} from "react-native";
import {connect} from 'react-redux';

class GroupMapView extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Text>Group Map View</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(GroupMapView);

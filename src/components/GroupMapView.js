import React, {Component} from 'react';
import {Text, View} from "react-native";
import {connect} from 'react-redux';
import {MapView} from "expo";

class GroupMapView extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <MapView style={{flex: 1}}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(GroupMapView);

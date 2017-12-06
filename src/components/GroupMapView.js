import React, {Component} from 'react';
import {View} from "react-native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

class GroupMapView extends Component {
    render() {
        console.log('GroupMapView', this.props);
        return (
            <View style={{height: '100%'}}>
                <MapView style={{height: '100%'}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.props.region}
                    showsUserLocation
                    showsMyLocationButton
                />
                {this.props.children}
            </View>
        );
    }
}

export default GroupMapView;

import React, {Component} from 'react';
import {View} from "react-native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

class GroupMapView extends Component {
    renderMembers() {
        if (this.props.group === undefined) {
            return;
        }
        const {members} = this.props.group;
        console.log('members!!', members)

        return members.map((m) => {
            console.log('m', m)
            return <MapView.Marker
                key={m.phone_number}
                coordinate={{latitude: 40.687797, longitude: -73.931026}}
                title={m.phone_number}
            />
        })
    }

    render() {
        console.log('GroupMapView', this.props);
        return (
            <View style={{height: '100%'}}>
                <MapView style={{height: '100%'}}
                         provider={PROVIDER_GOOGLE}
                         initialRegion={this.props.region}
                         showsUserLocation
                         showsMyLocationButton
                >
                    {this.renderMembers()}
                </MapView>
                {this.props.children}

            </View>
        );
    }
}

export default GroupMapView;

import React, {Component} from 'react';
import {FlatList, ListView, TouchableOpacity, View} from "react-native";
import GroupMembers from "../components/GroupMembers";
import GroupMapView from "../components/GroupMapView";
import gql from 'graphql-tag';
import {compose, graphql} from "react-apollo";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {Text} from "react-native-elements";


const earthRadius = 6371000.0;


class GroupDetailAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            group: {
                id: 'admin-group',
                members: [
                    {
                        phone_number: '+1',
                        first_name: '0',
                        last_name: '1'
                    },
                    {
                        phone_number: '+2',
                        first_name: '0',
                        last_name: '2'
                    }],
            },
            memberLocations: {
                '+1': {latitude: 40.687797, longitude: -73.931026},
                '+2': {latitude: 40.687798, longitude: -73.931126},
            },
            userLocation: {},
            places: [],
        };

        this.mapViewRef = "mapView";
        this.placesListViewRef = "placesListView";
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    ...this.state,
                    userLocation: position.coords,
                });
            },
            (error) => this.setState({error: error.message}),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10,
            },
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    onDragEnd(phoneNumber, {nativeEvent}) {
        this.setState({
            ...this.state,
            memberLocations: {
                ...this.state.memberLocations,
                [phoneNumber]: nativeEvent.coordinate
            }
        });

        return this.reloadPlaces();
    }

    getUserAndMemberLocations() {
        const {userLocation, memberLocations} = this.state;
        let locations = [{
            lat: userLocation.latitude,
            lng: userLocation.longitude,
        }];

        for (const memberId in memberLocations) {
            const loc = memberLocations[memberId];
            locations.push({
                lat: loc.latitude,
                lng: loc.longitude,
            });
        }

        return locations;
    }

    reloadPlaces() {
        const {phoneNumber} = this.props.match.params;
        const {userLocation, memberLocations} = this.state;

        let locations = this.getUserAndMemberLocations();

        let modes = ['WALKING'];
        for (const memberId in memberLocations) {
            modes.push('WALKING');
        }

        return this.props.findPlaces({
            variables: {
                phoneNumber,
                locations,
                modes,
            }
        }).then((resp) => {
            console.log('DATA', resp);
            this.setState({
                ...this.state,
                places: resp.data.findPlaces,
            })
        }).catch((err) => {
            console.error(err);
        });
    }

    renderMembers() {
        const {members} = this.state.group;

        return members.map((m) => {
            const coord = this.state.memberLocations[m.phone_number];
            return <MapView.Marker draggable
                                   key={m.phone_number}
                                   coordinate={coord}
                                   title={m.phone_number}

                                   onDragEnd={(e) => this.onDragEnd(m.phone_number, e)}
            />
        })
    }

    renderPlacesOnMap() {
        const {places} = this.state;
        if (places === undefined) {
            return;
        }

        return places.map((p, index) => {
            const {lat, lng} = p.coordinates;
            let value = Number(((index + 1) / places.length) * 255).toFixed(0);
            console.log(p, value);
            let color = `rgba(${value}, ${value}, ${value})`;
            return <View key={p.id}>
                {console.log(`${p.name}: ${index}`)}
                <MapView.Marker
                    ref={p.id}
                    title={`${index + 1}: ${p.name}`}
                    coordinate={{
                        latitude: lat,
                        longitude: lng,
                    }}
                    pinColor={'green'}
                    // image={p.icon}
                    onPress={() => {
                        console.log("pressing", p.name);

                        const placesList = this.refs[this.placesListViewRef];

                        placesList.scrollToIndex({animated:true, index})
                    }}
                />
            </View>
        })
    }

    hsin(theta) {
        return Math.pow(Math.sin(theta / 2), 2)
    }

    distanceBetween(coord1, coord2) {
        const lat1 = coord1.lat * Math.PI / 180.0;
        const lat2 = coord2.lat * Math.PI / 180.0;
        const lng1 = coord1.lng * Math.PI / 180.0;
        const lng2 = coord2.lng * Math.PI / 180.0;

        const h = this.hsin(lat2 - lat1) + Math.cos(lat1) * Math.cos(lat2) * this.hsin(lng2 - lng1);
        return 2 * earthRadius * Math.asin(Math.sqrt(h))
    }

    getCenter(coords) {
        let nCoords = coords.length;
        if (nCoords === 0 || nCoords === undefined) {
            return null;
        }

        let sum = {lat: 0, lng: 0};
        for (const i in coords) {
            console.log(`coord:`, i);
            sum.lat += coords[i].lat;
            sum.lng += coords[i].lng;
        }
        console.log(`sum:`, sum);

        return {
            lat: sum.lat / nCoords,
            lng: sum.lng / nCoords,
        };
    }

    getMaxDistance(point, coords) {
        let maxDistance = 0;
        for (const i in coords) {
            let dist = this.distanceBetween(point, coords[i]);
            if (dist > maxDistance) {
                maxDistance = dist;
            }
        }
        return maxDistance;
    }

    renderSearchRadius() {
        const {userLocation} = this.state;
        if (userLocation.latitude === undefined || userLocation.longitude === undefined) {
            return;
        }

        let locations = this.getUserAndMemberLocations();

        console.log(locations);

        let center = this.getCenter(locations);
        let radius = Math.min(Math.max(this.getMaxDistance(center, locations), 804.672), 50000);

        console.log(center, radius);

        return <MapView.Circle
            center={{latitude: center.lat, longitude: center.lng}}
            radius={radius}
            strokeColor="#aaa"
            strokeWidth={1}
        />
    }

    onPlacePressed(place) {
        console.log(place, "pressed");

        const placeMarker = this.refs[place.id];

        placeMarker.showCallout();
    }

    renderPlacesList() {
        const {places} = this.state;

        return (<View style={{height: 100, width: "100%", position: "absolute", bottom: 0, backgroundColor: "white"}}>
            <FlatList
                ref={this.placesListViewRef}
                horizontal
                data={places}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => {
                    return (<TouchableOpacity style={{padding: 5}} onPress={() => this.onPlacePressed(item)}>
                        <Text>{index + 1}</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.id}</Text>
                    </TouchableOpacity>)
                }}
            />
        </View>);

        // return (<View style={{
        //     flexDirection: 'row',
        //     position: 'absolute',
        //     bottom: 0,
        //     backgroundColor: 'white',
        //     height: 60,
        // }}>
        //     {places.map((p, index) => {
        //         return (<View
        //             key={p.id}
        //             style={{width: "100%"}}
        //         >
        //             <Text>
        //                 {p.name}
        //             </Text>
        //         </View>);
        //     })}
        // </View>);
    }

    render() {

        console.log('GroupDetailAdmin', this.state, this.props);
        const {loading, group} = this.state;


        return (
            <View>
                {<MapView style={{height: '100%'}}
                          ref={this.mapViewRef}
                          provider={PROVIDER_GOOGLE}
                          initialRegion={{
                              latitude: 40.6833222,
                              longitude: -73.9301036,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                          }}
                          showsUserLocation
                          showsMyLocationButton
                >
                    {this.renderMembers()}
                    {this.renderPlacesOnMap()}
                    {this.renderSearchRadius()}
                </MapView>}

                <GroupMembers loading={loading} group={group}/>

                {this.renderPlacesList()}
            </View>
        );
    }
}


const query = gql`
mutation FindPlaces($phoneNumber: String!, $locations: [LatLngInput], $modes: [ModeOfTransport]) {
    findPlaces(phone_number: $phoneNumber, locations: $locations, modes: $modes) {
        id,
        name,
        icon,
        rating,
        price_level,
        website,
        url,
        formatted_address,
        formatted_phone_number,
        coordinates {
            lat,
            lng
        },
    }
}
`;

export default compose(
    graphql(query, {
        name: 'findPlaces',
    })
)(GroupDetailAdmin);

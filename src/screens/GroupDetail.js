import React, {Component} from 'react';
import {View} from "react-native";
import GroupMembers from "../components/GroupMembers";
import GroupMapView from "../components/GroupMapView";
import gql from 'graphql-tag';
import {compose, graphql} from "react-apollo";


class GroupDetail extends Component {
    render() {
        console.log('GroupDetail', this.props);
        const {loading, group} = this.props.data;
        return (
            <View>
                <GroupMapView region={{
                    latitude: 40.6833222,
                    longitude: -73.9301036,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} group={group}>
                    <GroupMembers loading={loading} group={group}/>

                    {/*/!*<GroupPlaces/>*!/*/}
                </GroupMapView>
            </View>
        );
    }
}

const query = gql`
query GetGroup($phoneNumber: String!, $id: String!) {
    group(phone_number: $phoneNumber, id: $id) {
        id,
        leader_id,
        members {
            phone_number,
            first_name,
            last_name,
            location {
                lat,
                lng
            }
        }
    }
}
`;

export default compose(
    graphql(query, {
        options: (props) => {
            console.log(props);
            const {phoneNumber, groupId} = props.match.params;
            return {variables: {phoneNumber, id: groupId}};
        }
    })
)(GroupDetail);

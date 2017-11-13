import React, {Component} from 'react';
import {Text, View} from "react-native";
import GroupChat from "../components/GroupChat";
import GroupMembers from "../components/GroupMembers";
import GroupMapView from "../components/GroupMapView";
import GroupPlaces from "../components/GroupPlaces";
import {connect} from "react-redux";
import * as _ from 'lodash';


class GroupDetail extends Component {
    static navigationOptions = ({navigation}) => {
        console.log(navigation);
        return {
            title: `Group Detail`,
        }
    };

    render() {
        const {members} = this.props;
        return (
            <View style={{flex: 1}}>
                <GroupMembers members={members}/>
                <GroupMapView/>
                <GroupPlaces/>
                <GroupChat/>
            </View>
        );
    }
}

const mapStateToParams = (state, screen) => {
    const {groups, contacts, auth} = state;
    const group = groups[screen.groupId];
    console.log('auth', auth);
    console.log('contacts', contacts);
    console.log('group', groups);
    const members = _.map(_.filter(group.member_ids, (memberId) => memberId !== auth.user.id), (memberId) => contacts.synced[memberId]);
    console.log('members', members);
    return {group, members};
};

export default connect(mapStateToParams, null)(GroupDetail);

import React, {Component} from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import * as _ from 'lodash';
import {Avatar} from "react-native-elements";

class GroupMembers extends Component {
    renderIcons(members) {
        return _.map(members, (member) => {
            console.log(member);
            const {first_name, last_name} = member;
            const initials = `${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`;
            return (<View key={member.phone_number} style={{padding: 2, paddingRight: 0}}>
                <Avatar
                    medium
                    rounded
                    title={initials}
                />
                <Text style={{fontSize: 8, alignSelf: 'center'}}>{first_name}</Text>
            </View>)
        });
    }

    render() {
        console.log('GroupMembers', this.props);
        const {loading, group} = this.props;
        if (loading) {
            return (<ActivityIndicator style={{height: '100%'}} size="large"/>)
        }
        return (
            <View style={{flexDirection: 'row', position: 'absolute', }}>
                {this.renderIcons(group.members)}
            </View>
        );
    }
}

export default GroupMembers;

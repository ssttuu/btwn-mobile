import React, {Component} from 'react';
import {Text, View} from "react-native";
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {Avatar} from "react-native-elements";

class GroupMembers extends Component {
    renderIcons(members) {
        return _.map(members, (member) => {
            console.log(member);
            const {first_name, last_name} = member;
            const initials = `${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`;
            return (<View key={member.id} style={{padding: 2, paddingRight: 0}}>

                <Avatar
                    small
                    rounded
                    title={initials}
                />
                <Text style={{fontSize: 8, alignSelf: 'center'}}>{first_name}</Text>
            </View>)
        });
    }

    render() {
        const {members} = this.props;
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {this.renderIcons(members)}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(GroupMembers);

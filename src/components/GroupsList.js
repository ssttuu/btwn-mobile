import React, {Component} from 'react';
import {Text, View, ListView, TouchableHighlight} from "react-native";
import {connect} from 'react-redux';
import _ from 'lodash';
import {Actions} from "react-native-router-flux";
import {GROUP_DETAIL_SCREEN} from "../RouterTypes";
import {getContacts} from "../actions/ContactsActions";
import {getGroups} from "../actions/GroupsActions";

class GroupsList extends Component {
    componentWillMount() {
        // TODO: this is likely the wrong place to get contacts
        this.props.getContacts();
        this.props.getGroups();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({groups}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        // TODO: sort
        const groupsList = _.values(groups);

        this.dataSource = ds.cloneWithRows(groupsList);
    }

    onRowPress(groupId) {
        Actions.push(GROUP_DETAIL_SCREEN, {groupId});
        Actions.drawerClose();
    }

    renderMembers(group) {
        const {user, contacts} = this.props;
        const memberIds = _.filter(group.member_ids, (mid) => mid !== user.id);
        const memberNames = _.map(memberIds, (mid) => {
            console.log('mid', mid);
            const contact = contacts.synced[mid];
            console.log('contact', contact);
            return `${contact.first_name} ${contact.last_name}`;
        });
        return (
            <Text>{_.join(memberNames, ', ')}</Text>
        );
    }

    renderRow(group) {
        return (
            <TouchableHighlight onPress={() => this.onRowPress(group.id)}>
                {this.renderMembers(group)}
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(group) => this.renderRow(group)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const {groups, contacts, auth} = state;
    console.log('MSTP: contacts');
    console.log(contacts);
    return {groups, contacts, user: auth.user};
};

export default connect(mapStateToProps, {getContacts, getGroups})(GroupsList);

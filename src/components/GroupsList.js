import React, {Component} from 'react';
import {Text, View, ListView, TouchableHighlight} from "react-native";
import _ from 'lodash';
import {graphql} from "react-apollo";
import {FormLabel} from "react-native-elements";
import queryGroups from "../queries/queryGroups";

class GroupsList extends Component {
    componentWillMount() {
        console.log('this.props.data', this.props.data);
        this.createDataSource(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
        this.createDataSource(nextProps.data);
    }

    createDataSource(data) {
        const {groups} = data;
        console.log('GROUPS', groups);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(groups || []);
    }

    renderMembers(group) {
        console.log(group.members);
        // const {user, contacts} = this.props;
        // const memberIds = _.filter(group.member_ids, (mPhone) => mPhone !== user.phone_number);
        const memberNames = _.map(group.members, (member) => {
            return `${member.first_name} ${member.last_name}`;
        });

        console.log(memberNames);
        return (
            <Text>{_.join(memberNames, ', ')}</Text>
        );
    }

    renderRow(group) {
        console.log('group', group);
        return (
            <TouchableHighlight
                style={styles.listItemStyle}
                onPress={() => this.props.onRowPress(group.id)}
            >
                <View>
                    {this.renderMembers(group)}
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        console.log('render')
        return (
            <View>
                <FormLabel>
                    Groups list
                </FormLabel>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(group) => this.renderRow(group)}
                />
            </View>
        );
    }


}

const styles = {
    listItemStyle: {
        minHeight: 60,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: 'grey'
    }
};


export default graphql(queryGroups, {
    options: (props) => {
        console.log(props);
        const {phoneNumber} = props;
        return {variables: {phoneNumber}}
    }
})(GroupsList);

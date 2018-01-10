import React, {Component} from 'react';
import {Text, View, ListView, TouchableHighlight} from "react-native";
import _ from 'lodash';
import {graphql} from "react-apollo";
import {FormLabel} from "react-native-elements";
import queryGroups from "../queries/queryGroups";
import gql from "graphql-tag";

const subscriptionTest = gql`
subscription {
    subTest
}
`;

class GroupsList extends Component {
    componentWillMount() {
        console.log('this', this);

        this.props.data.subscribeToMore({
            document: subscriptionTest,
            updateQuery: (prev, next) => {
                console.log('PREV: ', prev, 'NEXT:', next)
            }
        });

        this.createDataSource(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.data);
    }

    createDataSource(data) {
        const {groups} = data;
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(groups || []);
    }

    renderMembers(group) {
        const memberNames = _.map(group.members, (member) => {
            return `${member.first_name} ${member.last_name}`;
        });

        return (
            <Text>{_.join(memberNames, ', ')}</Text>
        );
    }

    renderRow(group) {
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
        const {phoneNumber} = props;
        return {variables: {phoneNumber}}
    }
})(GroupsList);

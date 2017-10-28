import React, {Component} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import CurrentUser from "../components/CurrentUser";
import GroupsList from "../components/GroupsList";
import {Icon} from "react-native-elements";

/*
    CurrentUserComponent
    GroupsListComponent
 */
class SideBar extends Component {

    componentWillMount() {
    }

    render() {
        const {scrollViewStyle, groupsHeaderStyle, groupsTextStyle, addGroupStyle} = styles;
        return (
            <ScrollView style={scrollViewStyle}>
                <CurrentUser/>

                <View style={groupsHeaderStyle}>
                    <Text style={groupsTextStyle}>Groups</Text>
                    <TouchableWithoutFeedback style={addGroupStyle}>
                        <Icon name='add-circle'/>
                    </TouchableWithoutFeedback>
                </View>
                <GroupsList/>
            </ScrollView>
        );
    }
}

const styles = {
    scrollViewStyle: {
        backgroundColor: 'orange'
    },
    groupsHeaderStyle: {
        flexDirection: 'row'
    },
    groupsTextStyle: {
        flex: 1
    },
    addGroupStyle: {
        flex: 1
    }
};

export default SideBar;

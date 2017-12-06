import React, {Component} from "react";
import {View} from "react-native";
import GroupsList from "../components/GroupsList";
import ActionButton from "react-native-action-button";
import NavBar from "../components/NavBar";
import {Icon} from "react-native-elements";

class Groups extends Component {
    render() {
        const {phoneNumber} = this.props.match.params;
        console.log(this.props);
        return (
            <View style={{height: '100%'}}>
                <NavBar title={{title: this.props.location.pathname}}
                        leftButton={<Icon name="menu" style={{padding: 15}}/>}
                        />
                <GroupsList
                    phoneNumber={phoneNumber}
                    onRowPress={(groupId) => this.props.history.push(`/users/${phoneNumber}/groups/${groupId}`)}
                />
                <ActionButton buttonColor="orange" onPress={() => {
                    this.props.history.push({
                        pathname: `/users/${phoneNumber}/group-create`,
                    })
                }}/>
            </View>
        );
    }
}

export default Groups;
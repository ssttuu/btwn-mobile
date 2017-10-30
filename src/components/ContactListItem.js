import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {Actions} from 'react-native-router-flux';
import {Avatar} from "react-native-elements";


class ContactListItem extends Component {

    renderIcon(initials, selected) {
        if (selected) {
            return <Avatar
                medium
                rounded
                icon={{name: 'check-circle', color: 'orange'}}
            />
        }

        return <Avatar
            medium
            rounded
            title={initials}
        />
    }

    renderJoinedIcon(joined) {
        if (joined) {
            return <Text>Invite</Text>;
        }

        return;
    }

    render() {

        const {id, first_name, last_name, phone_number, joined} = this.props.contact;
        const fullName = `${first_name} ${last_name}`;
        const initials = `${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`;

        return (
            <TouchableWithoutFeedback onPress={() => this.props.onPress({id})}>
                <View style={styles.rowViewStyle}>
                    {this.renderIcon(initials, this.props.selected)}
                    <View>
                        <Text style={styles.nameStyle}>
                            {fullName}
                        </Text>
                        <Text style={styles.phoneNumberStyle}>{phone_number}</Text>
                    </View>
                    {this.renderJoinedIcon(joined)}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    rowViewStyle: {
        flexDirection: 'row',
        margin: 5,
    },
    nameStyle: {
        fontSize: 18,
        paddingLeft: 15,
    },
    phoneNumberStyle: {
        fontSize: 12,
        paddingLeft: 15,
        color: 'gray',
    }
};

export default ContactListItem;

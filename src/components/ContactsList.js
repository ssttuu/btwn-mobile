import React, {Component} from 'react';
import {Text, View, ListView} from "react-native";
import {connect} from 'react-redux';
import ContactListItem from "./ContactListItem";


class ContactsList extends Component {
    componentWillMount() {
        // this.props.employeesFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({contacts}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(contacts);
    }

    renderRow(contact) {
        const {selected, onRowPress} = this.props;
        return <ContactListItem
            contact={contact}
            selected={selected[contact.phone_number] === true}
            onPress={() => onRowPress(contact)}
        />
    }

    render() {
        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(contact) => this.renderRow(contact)}
                />
            </View>
        );
    }
}

export default ContactsList;

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
            selected={selected.indexOf(contact.id) >= 0}
            onPress={() => onRowPress({id: contact.id})}
        />
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(contact) => this.renderRow(contact)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(ContactsList);

import React, {Component} from 'react';
import {Text, View} from "react-native";
import {Avatar, Badge, FormInput} from 'react-native-elements';
import ContactsList from "../components/ContactsList";
import {getLocalContacts} from "../actions/ContactsActions";
import {connect} from "react-redux";
import _ from 'lodash';
import {contactPressed, searchTextChanged, createGroupPressed} from "../actions/NewGroupActions";
import {Actions} from "react-native-router-flux";

class CreateGroupModal extends Component {
    componentWillMount() {
        this.props.getLocalContacts();
    }

    componentDidMount() {
        console.log('componentDidMount');
        Actions.refresh({onRight: () => this.createGroupButtonPressed()})
    }

    createGroupButtonPressed() {
        this.props.createGroupPressed(this.props.selected)
    }

    onSearchTextChange(text) {
        this.props.searchTextChanged(text);
    }

    rowPressed({id}) {
        this.props.contactPressed({contactId: id})
    }

    renderCurrentSelection() {
        const {syncedContacts, selected} = this.props;
        return _.map(selected, (id, index) => {
            const contact = syncedContacts[id];
            const {first_name, last_name} = contact;
            const fullName = `${first_name} ${last_name}`;
            const initials = `${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`;

            return (
                <Badge key={id}
                       containerStyle={styles.selectedBadgeStyle}
                       wrapperStyle={{padding: 0, margin: 0}}>
                    <View style={{flexDirection: 'row'}}>
                        <Avatar small rounded title={initials}/>
                        <Text style={{justifyContent: 'center', alignSelf: 'center', padding: 5}}>
                            {fullName}
                        </Text>
                    </View>
                </Badge>
            );
        })
    }

    render() {
        const {sortedSyncedContacts, selected, searchText} = this.props;
        console.log('Selected', selected);
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.renderCurrentSelection()}
                    <FormInput
                        containerStyle={{minWidth: 100}}
                        onChangeText={text => this.onSearchTextChange(text)}
                        value={searchText}
                    />
                </View>

                <ContactsList
                    contacts={sortedSyncedContacts}
                    selected={selected}
                    onRowPress={({id}) => this.rowPressed({id})}
                />
            </View>
        );
    }
}

const styles = {
    selectedBadgeStyle: {
        backgroundColor: 'orange',
        padding: 0,
        margin: 0,
    }
};

const mapStateToProps = (state) => {
    const {local, synced} = state.contacts;
    const sortedSyncedContacts = _.sortBy(_.map(synced, (contact, key) => contact), ['last_name', 'first_name']);

    const {selected, searchText} = state.newGroup;

    return {localContacts: local, syncedContacts: synced, sortedSyncedContacts, selected, searchText};
};

export default connect(mapStateToProps, {
    getLocalContacts,
    contactPressed,
    searchTextChanged,
    createGroupPressed
})(CreateGroupModal);

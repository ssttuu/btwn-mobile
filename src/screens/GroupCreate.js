import React, {Component} from 'react';
import {Text, View} from "react-native";
import {Avatar, Badge, FormInput, Icon} from 'react-native-elements';
import ContactsList from "../components/ContactsList";
import _ from 'lodash';
import gql from "graphql-tag";
import {compose, graphql} from "react-apollo";
import NavBar from "../components/NavBar";
import queryGroups from "../queries/queryGroups";

const Contacts = require('react-native-contacts');
const PN = require("google-libphonenumber");

const phoneUtil = PN.PhoneNumberUtil.getInstance();


class GroupCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {},
            search: ''
        }
    }

    componentWillMount() {
        const {phoneNumber} = this.props.location.state;

        Contacts.getAll(async (err, contacts) => {
            if (err === 'denied') {
                console.error(err);
            }

            console.log('TheContacts', contacts);

            const filteredContacts = _.filter(contacts, (contact) => {
                const mobilePhone = _.find(contact.phoneNumbers, ['label', 'mobile']);
                if (mobilePhone === undefined) {
                    return false;
                }
                try {
                    const phoneNumberParsed = phoneUtil.parse(mobilePhone.number, 'US');
                    return phoneUtil.isValidNumber(phoneNumberParsed);
                } catch (e) {
                    return false;
                }
            });

            const formattedContacts = _.map(filteredContacts, (contact) => {
                const mobilePhone = _.find(contact.phoneNumbers, ['label', 'mobile']);
                const phoneNumberParsed = phoneUtil.parse(mobilePhone.number, 'US');
                const phoneNumber = phoneUtil.format(phoneNumberParsed, PN.PhoneNumberFormat.E164);

                const homeEmail = _.find(contact.emailAddresses, ['label', 'home']);
                return {
                    phone_number: phoneNumber,
                    first_name: contact.givenName,
                    last_name: contact.familyName,
                    // email: homeEmail ? homeEmail.email : null,
                };
            });

            this.props.uploadContacts({
                variables: {phoneNumber, contacts: formattedContacts},
                optimisticResponse: {
                    __typename: 'Mutation',
                    uploadContacts: formattedContacts.map(fc => {
                        return {...fc, __typename: 'Contact'};
                    })
                }
            }).then((response) => {
                console.log('UPLOADED CONTACTS')
                console.log(response);
            }).catch((err) => console.error(err))
        });


        console.log('GroupCreate', this.props);
    }

    componentDidMount() {
        // console.log('componentDidMount');
        // Actions.refresh({onRight: () => this.createGroupButtonPressed()})
    }

    onSearchTextChange(text) {
        this.setState({
            search: text
        });
    }

    rowPressed(phoneNumber) {
        console.log('contact pressed', phoneNumber);
        const {selected} = this.state;
        if (selected[phoneNumber]) {
            delete selected[phoneNumber];
        } else {
            selected[phoneNumber] = true;
        }
        this.setState({selected})
    }

    renderCurrentSelection() {
        const {selected} = this.state;
        const {loading, contacts} = this.props.getContacts;

        const contactsByPhoneNumber = _.keyBy(contacts, 'phone_number');

        return _.map(selected, (value, phoneNumber) => {
            const contact = contactsByPhoneNumber[phoneNumber];
            console.log(contact);
            if (contact === undefined) {
                return;
            }
            const {first_name, last_name} = contact;
            const fullName = `${first_name} ${last_name}`;

            let initials = ''
            if (first_name !== null) {
                initials += first_name.charAt(0).toUpperCase();
            }
            if (last_name !== null) {
                initials += last_name.charAt(0).toUpperCase();
            }

            return (
                <Badge key={phoneNumber}
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

    createGroupPressed() {
        const {phoneNumber} = this.props.location.state;
        const {selected} = this.state;

        const memberIds = [phoneNumber, ..._.keys(selected)];
        const {contacts} = this.props.getContacts;
        const contactsByPhoneNumber = _.keyBy(contacts, 'phone_number');

        this.props.createGroup({
            variables: {
                phoneNumber,
                leaderId: phoneNumber,
                memberIds: memberIds
            },
            refetchQueries: [
                {
                    query: queryGroups,
                    variables: {phoneNumber}
                }
            ]
            // optimisticResponse: {
            //     __typename: 'Mutation',
            //     createGroup: {
            //         __typename: 'Group',
            //         id: 'newGroup',
            //         leader: {
            //             __typename: 'User',
            //             phone_number: phoneNumber,
            //             first_name: "Stu",
            //             last_name: "Schwartz",
            //         },
            //         members: memberIds.map(mid => {
            //             return {__typename: 'Contact', phone_number: '', first_name: '', last_name: '', ...contactsByPhoneNumber[mid]};
            //         })
            //     }
            // }
        }).then((data) => {
            console.log('CREATED GROUP');
            console.log(data);
        }).catch(err => console.error(err));

        this.props.history.goBack();
    }

    render() {
        // const {sortedSyncedContacts, selected, searchText} = this.props;
        console.log('GroupCreate.props', this.props);
        console.log('GroupCreate.state', this.state);
        const {loading, contacts} = this.props.getContacts;
        if (loading) {
            return (
                <View>
                    <FormInput>Loading...</FormInput>
                </View>
            )
        }

        const {search, selected} = this.state;

        return (
            <View>
                <NavBar title={{title: this.props.location.pathname}}
                        leftButton={<Icon name="arrow-back"
                                          style={{padding: 15}}
                                          onPress={() => this.props.history.goBack()}/>}
                        rightButton={<Icon name="check"
                                           style={{padding: 15}}
                                           onPress={() => this.createGroupPressed()}/>}
                />
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.renderCurrentSelection()}
                    <FormInput
                        containerStyle={{minWidth: 100}}
                        onChangeText={text => this.onSearchTextChange(text)}
                        value={search}
                    />
                </View>

                <ContactsList
                    contacts={contacts}
                    selected={selected}
                    onRowPress={(c) => this.rowPressed(c.phone_number)}
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


const getContacts = gql`
query ListContacts($phoneNumber: String!) {
    contacts(phone_number: $phoneNumber) {
        phone_number,
        first_name,
        last_name
    }
}
`;

const uploadContacts = gql`
mutation UploadContacts($phoneNumber: String!, $contacts: [ContactInput]) {
    uploadContacts(phone_number: $phoneNumber, contacts: $contacts) {
        phone_number,
        first_name,
        last_name
    }
}
`;

const createGroup = gql`
mutation CreateGroup($phoneNumber: String!, $leaderId: String!, $memberIds: [String!]) {
    createGroup(phone_number: $phoneNumber, leader_id: $leaderId, member_ids: $memberIds) {
        id,
        leader {
            phone_number,
            first_name,
            last_name
        }
        members {
            phone_number,
            first_name
            last_name
        }
    }
}
`;


export default compose(
    graphql(getContacts, {
        name: 'getContacts',
        options: (props) => {
            const {phoneNumber} = props.location.state;
            return {variables: {phoneNumber}}
        }
    }),
    graphql(uploadContacts, {
        name: 'uploadContacts'
    }),
    graphql(createGroup, {
        name: 'createGroup'
    })
)(GroupCreate);
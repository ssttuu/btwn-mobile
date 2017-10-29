import React, {Component} from 'react';
import {Text, View} from "react-native";
import {SearchBar} from 'react-native-elements';
var Contacts = require('react-native-contacts');
import ContactsList from "../components/ContactsList";

class CreateGroupModal extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: 'Create Group',
            headerRight: <Text>Right</Text>,
            // rightButton: () => <Text>RIGHT2</Text>,
            // rightTitle: 'Stu'
        }
    };

    componentWillMount() {
        console.log('Contacts', Contacts);
        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                console.log('Error getting contacts:', err);
            } else {
                console.log(contacts);
            }
        });
    }

    onSearchTextChange(text) {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SearchBar
                    onChangeText={text => this.onSearchTextChange(text)}
                />
                <ContactsList/>
            </View>
        );
    }
}

export default CreateGroupModal;

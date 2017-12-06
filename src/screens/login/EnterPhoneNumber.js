import React, {Component} from 'react';
import {ActivityIndicator, View} from "react-native";
import {Button, FormInput, FormLabel} from "react-native-elements";
import gql from 'graphql-tag'
import {graphql} from "react-apollo";


class EnterPhoneNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {phoneNumber: '+16467249483'};
    }

    onButtonPress() {
        const {phoneNumber} = this.state;

        this.props.mutate({
            variables: {phoneNumber}
        }).then((data) => {
            this.props.history.push({
                pathname: '/enter-verification-code',
                state: {phoneNumber}
            })
        })
    }

    renderButton() {
        if (this.props.loading) {
            return <ActivityIndicator size='large'/>
        }

        return (
            <Button
                raised
                iconRight={{name: 'phone'}}
                title='Send Verification Code'
                backgroundColor='orange'
                onPress={() => this.onButtonPress()}
            />
        );
    }


    render() {
        return (
            <View>
                <FormLabel>Phone</FormLabel>
                <FormInput
                    onChange={event => this.setState({title: event.target.value})}
                    value={this.state.phoneNumber}
                    placeholder="+16467249483"
                />
                {this.renderButton()}
            </View>
        );
    }
}

const mutation = gql`
mutation SendCode($phoneNumber: String) {
    sendVerificationCode(phone_number: $phoneNumber)
}
`;

export default graphql(mutation)(EnterPhoneNumber);

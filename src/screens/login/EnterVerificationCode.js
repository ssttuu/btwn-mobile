import React, {Component} from 'react';
import {ActivityIndicator, View} from "react-native";
import {Button, FormInput, FormLabel, FormValidationMessage} from "react-native-elements";
import gql from 'graphql-tag';
import {graphql} from "react-apollo";


class EnterVerificationCode extends Component {
    constructor(props) {
        super(props);

        this.state = {code: ''}
    }

    componentWillMount() {
    }

    onButtonPress() {
        const {phoneNumber} = this.props.location.state;
        const {code} = this.state;

        console.log(this.state, this.props);

        this.props.mutate({
            variables: {phoneNumber, code}
        }).then((data) => {
            this.props.history.push({
                pathname: '/home',
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
                title='Login'
                backgroundColor='orange'
                onPress={() => this.onButtonPress()}
            />
        );
    }

    render() {
        return (
            <View>
                <FormLabel>Verification Code</FormLabel>
                <FormInput
                    onChangeText={code => this.setState({code})}
                    value={this.state.code}
                    placeholder="1234"
                />
                <FormValidationMessage>{this.props.error}</FormValidationMessage>
                {this.renderButton()}
            </View>
        );
    }
}

const mutation = gql`
mutation Login($phoneNumber: String!, $code: String!) {
    login(phone_number: $phoneNumber, code: $code) {
        jwt
    }
}
`;

export default graphql(mutation)(EnterVerificationCode)
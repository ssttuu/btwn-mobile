import React, {Component} from 'react';
import {ActivityIndicator, View} from "react-native";
import {Button, FormInput, FormLabel, FormValidationMessage} from "react-native-elements";
import {connect} from 'react-redux';
import {checkCurrentUser, phoneChanged, sendVerificationCode} from "../../actions/AuthActions";

class EnterPhoneNumber extends Component {
    componentWillMount() {
        this.props.checkCurrentUser()
    }

    onPhoneChanged(phone) {
        this.props.phoneChanged(phone)
    }

    onButtonPress() {
        this.props.sendVerificationCode({phoneNumber: this.props.phone});
    }

    renderButton() {
        if (this.props.loading) {
            return <ActivityIndicator size='large'/>
        }

        return (
            <Button
                raised
                iconRight={{name: 'phone'}}
                title='Verify'
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
                    onChangeText={phone => this.onPhoneChanged(phone)}
                    value={this.props.phone}
                    placeholder="+123456789"
                />
                <FormValidationMessage>{this.props.error}</FormValidationMessage>
                {this.renderButton()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const {phone, loading, error} = state.auth;

    return {phone, loading, error};
};

export default connect(mapStateToProps, {phoneChanged, sendVerificationCode, checkCurrentUser})(EnterPhoneNumber);

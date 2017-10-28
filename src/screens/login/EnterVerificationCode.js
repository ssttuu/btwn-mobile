import React, {Component} from 'react';
import {ActivityIndicator, View} from "react-native";
import {Button, FormInput, FormLabel, FormValidationMessage} from "react-native-elements";
import {connect} from 'react-redux';
import {verificationCodeChanged, login, checkCurrentUser} from "../../actions/AuthActions";

class EnterVerificationCode extends Component {
    componentWillMount() {
        this.props.checkCurrentUser()
    }

    onVerificationCodeChanged(phone) {
        this.props.verificationCodeChanged(phone);
    }

    onButtonPress() {
        const {phone, verificationCode} = this.props;
        this.props.login({phoneNumber: phone, code: verificationCode});
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
                    onChangeText={code => this.onVerificationCodeChanged(code)}
                    value={this.props.verificationCode}
                    placeholder="1234"
                />
                <FormValidationMessage>{this.props.error}</FormValidationMessage>
                {this.renderButton()}
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    const {phone, verificationCode, loading, error} = state.auth;

    return {phone, verificationCode, loading, error};
};

export default connect(mapStateToProps, {verificationCodeChanged, login, checkCurrentUser})(EnterVerificationCode);

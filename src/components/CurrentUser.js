import React, {Component} from 'react';
import {View} from "react-native";
import {ButtonGroup, FormLabel, Icon} from "react-native-elements";

class CurrentUser extends Component {
    state = {index: 0};

    componentWillMount() {
        this.buttonIcons = [
            {element: () => <Icon name='directions-walk'/>},
            {element: () => <Icon name='directions-bike'/>},
            {element: () => <Icon name='directions-transit'/>},
            {element: () => <Icon name='directions-car'/>},
        ];
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FormLabel>Default Mode of Transit</FormLabel>
                <ButtonGroup
                    containerStyle={styles.buttonGroupStyle}
                    onPress={index => this.setState({index})}
                    selectedIndex={this.state.index}
                    buttons={this.buttonIcons}
                />
            </View>
        );
    }
}

const styles = {
    buttonGroupStyle: {
    }
};


export default CurrentUser;

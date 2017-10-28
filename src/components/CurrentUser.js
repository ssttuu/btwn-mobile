import React, {Component} from 'react';
import {Text, View} from "react-native";
import {connect} from 'react-redux';
import {MapView} from "expo";
import {Avatar, ButtonGroup, FormLabel, Icon} from "react-native-elements";

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
                <Avatar
                    large
                    rounded
                    source={{uri: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAcZAAAAJGIyYzI3OWQyLWI4YzAtNDBmYi05MDY3LThmNDY4OTNjMGUzMQ.jpg'}}
                    onPress={() => console.log('Clicked Avatar')}
                />
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

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(CurrentUser);

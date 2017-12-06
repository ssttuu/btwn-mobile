import React, {Component} from 'react';
import {Text, View} from "react-native";


class GroupPlaces extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={{flex: 1}}>
                    Group Places
                </Text>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        position: 'absolute',
        bottom: 0,
        height: 200,
        width: '100%',
        flex: 1,
        backgroundColor: 'gray'
    }
};

export default GroupPlaces;

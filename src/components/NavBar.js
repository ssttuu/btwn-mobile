import React, {Component} from "react";
import NavigationBar from "react-native-navbar";

class NavBar extends Component {
    render() {
        return (
            <NavigationBar {...this.props}/>
        )
    }
}

export default NavBar;
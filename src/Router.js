import React from 'react';

import {Router, Scene, Stack, Drawer, Modal} from "react-native-router-flux";
import GroupDetail from "./screens/GroupDetail";
import SideBar from "./screens/SideBar";
import EnterPhoneNumber from "./screens/login/EnterPhoneNumber";
import EnterVerificationCode from "./screens/login/EnterVerificationCode";
import Home from "./screens/Home";
import {
    CREATE_GROUP_SCREEN,
    ENTER_PHONE_NUMBER_SCREEN, ENTER_VERIFICATION_CODE_SCREEN, GROUP_DETAIL_SCREEN, HOME_SCREEN,
    MAIN_SCREEN
} from "./RouterTypes";
import CreateGroupScreen from "./screens/CreateGroupModal";
import {Text, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";


const RouterComponent = () => {
    return (
        <Router>
            <Stack key="base">
                <Scene key={ENTER_PHONE_NUMBER_SCREEN} component={EnterPhoneNumber} title="Enter Phone Number"/>
                <Scene key={ENTER_VERIFICATION_CODE_SCREEN} component={EnterVerificationCode}
                       title="Enter Verification Code"/>

                <Drawer hideNavBar
                        key={MAIN_SCREEN}
                        contentComponent={SideBar}
                        drawerWidth={300}
                >
                    <Stack key="root">
                        <Scene key={HOME_SCREEN}
                               component={Home} title="Home"
                               rightTitle="Right"
                               onRight={() => console.log('right')}
                               {...{initial: true}}/>
                        <Scene key={GROUP_DETAIL_SCREEN} component={GroupDetail}
                               title="Group Detail" {...{initial: false}}/>
                    </Stack>
                </Drawer>

                <Modal key={CREATE_GROUP_SCREEN}
                       renderRightButton={() => {
                           return (
                               <TouchableOpacity onPress={() => 'custom right'}>
                                   <Icon name='check'/>
                               </TouchableOpacity>
                           );
                       }}
                       onRight={() => console.log('right')}
                       component={CreateGroupScreen}
                       title="Create Group"
                />

            </Stack>

        </Router>
    );
};

export default RouterComponent;

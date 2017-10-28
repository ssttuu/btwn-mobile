import React from 'react';

import {Router, Scene, Stack, Drawer} from "react-native-router-flux";
import GroupDetail from "./screens/GroupDetail";
import SideBar from "./screens/SideBar";
import EnterPhoneNumber from "./screens/login/EnterPhoneNumber";
import EnterVerificationCode from "./screens/login/EnterVerificationCode";
import Home from "./screens/Home";
import {
    ENTER_PHONE_NUMBER_SCREEN, ENTER_VERIFICATION_CODE_SCREEN, GROUP_DETAIL_SCREEN, HOME_SCREEN,
    MAIN_SCREEN
} from "./RouterTypes";


const RouterComponent = () => {
    return (
        <Router>
            <Stack key="base" hideNavBar>
                <Stack key="login" initial>
                    <Scene key={ENTER_PHONE_NUMBER_SCREEN} component={EnterPhoneNumber} title="Enter Phone Number"/>
                    <Scene key={ENTER_VERIFICATION_CODE_SCREEN} component={EnterVerificationCode} title="Enter Verification Code"/>
                </Stack>

                <Drawer
                    key={MAIN_SCREEN}
                    contentComponent={SideBar}
                    drawerWidth={300}
                >
                    <Stack key="root">
                        <Scene key={HOME_SCREEN} component={Home} title="Home" {...{initial:true}}/>
                        <Scene key={GROUP_DETAIL_SCREEN} component={GroupDetail} title="Group Detail" {...{initial:false}}/>

                    </Stack>
                </Drawer>
            </Stack>

        </Router>
    );
};

export default RouterComponent;

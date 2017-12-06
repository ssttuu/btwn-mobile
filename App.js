import React, {Component} from 'react';
import {NativeRouter, Route} from 'react-router-native'
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from "react-apollo";

import {GRAPHQL_URL} from "./src/api/constants";
import EnterPhoneNumber from "./src/screens/login/EnterPhoneNumber";
import Splash from "./src/screens/Splash";
import {View} from "react-native";
import EnterVerificationCode from "./src/screens/login/EnterVerificationCode";
import CreateGroupModal from "./src/screens/GroupCreate";
import GroupDetail from "./src/screens/GroupDetail";
import Groups from "./src/screens/Groups";
import {getJwt} from "./src/api/local";


const httpLink = new HttpLink({uri: GRAPHQL_URL});

const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    let {jwt} = await getJwt();
    // return the headers to the context so httpLink can read them
    console.log(jwt);
    console.log(jwt);
    console.log(jwt ? `Bearer ${jwt}` : null);

    return {
        headers: {
            ...headers,
            authorization: jwt ? `Bearer ${jwt}` : null,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        dataIdFromObject: (o) => {
            switch (o.__typename) {
                case 'Contact':
                case 'User':
                    return o.phone_number;
                case 'Group':
                    return o.id;
                default:
                    console.warn('o', o);
                    return null;
            }
        }
    })
});


export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <NativeRouter>
                    <View>
                        <Route
                            path="/"
                            exact={true}
                            component={Splash}
                        />
                        <Route
                            path="/enter-phone-number"
                            component={EnterPhoneNumber}
                        />
                        <Route
                            path="/enter-verification-code"
                            component={EnterVerificationCode}
                        />
                        <Route
                            path="/users/:phoneNumber/groups"
                            exact={true}
                            component={Groups}
                        />
                        <Route
                            path="/users/:phoneNumber/group-create"
                            exact={true}
                            component={CreateGroupModal}
                        />
                        <Route
                            path="/users/:phoneNumber/groups/:groupId"
                            component={GroupDetail}
                        />
                    </View>
                </NativeRouter>
            </ApolloProvider>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

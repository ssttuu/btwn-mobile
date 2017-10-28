import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import Router from "./src/Router";



export default class App extends Component {
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
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

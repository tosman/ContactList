/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component, Text, DeviceEventEmitter, Alert, TextInput, BackAndroid} from 'react-native';
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} from 'react-native-router-flux'
import ContactListApp from './containers/ContactListApp'
import { Provider, connect} from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';

const RouterWithRedux = connect()(Router);
const store = compose(
)(createStore)(reducers);


class App extends Component {
    render() {
        return (
          <Provider store={store}>
               <RouterWithRedux>
                 <Scene key="root">
                     <Scene key="contactList" initial={true} component={ContactListApp} title="Contact List"/>
                 </Scene>
               </RouterWithRedux>
             </Provider>
        );
    }
}

module.exports = App;

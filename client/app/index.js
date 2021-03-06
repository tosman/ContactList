/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    Component,
    Text,
    DeviceEventEmitter,
    Alert,
    TextInput,
    BackAndroid
} from 'react-native';
import {
    Scene,
    Router,
    TabBar,
    Modal,
    Schema,
    Actions,
    Reducer
} from 'react-native-router-flux';
import ContactListApp from './containers/ContactListApp';
import ContactDetail from './components/ContactDetail';
import Login from './containers/Login';
import Register from './containers/Register';
import AddContact from './containers/AddContact';

import {Provider, connect} from 'react-redux';
import reducers from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()
const RouterWithRedux = connect()(Router);
const store = createStore(reducers,
   applyMiddleware(thunkMiddleware, loggerMiddleware));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux>
                  <Scene key="modal" component={Modal} >
                    <Scene key="root">
                        <Scene key="register" direction="vertical" >
                         <Scene key="registerModal" schema="modal" hideNavBar={true} component={Register} title="Register"/>
                        </Scene>
                        <Scene key="login" hideNavBar={true} initial={true} component={Login} title="Login"/>
                        <Scene key="contactList"  navigationBarStyle={{backgroundColor:"#D8D8D8"}} component={ContactListApp} title="Contact List" onRight={()=>Actions.addContact()} rightTitle="Right"/>
                        <Scene key="contactDetail" component={ContactDetail} title="Contact Detail"/>
                        <Scene key="addContact" component={AddContact} title="AddContact"/>
                    </Scene>
                  </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

module.exports = App;

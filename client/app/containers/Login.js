/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    ActivityIndicatorIOS,
    TouchableHighlight,
    AppRegistry,
    Component,
    StyleSheet,
    ListView,
    Text,
    View,
    PropTypes,
    TextInput
} from 'react-native';
import {connect} from 'react-redux';
import mapValues from 'lodash/mapValues';
import * as authActions from '../actions/authActionCreators'
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button'

class Login extends Component {
    state = {
      username: null,
      password: null,
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.header}> My Contacts </Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({username: text})}
                autoCorrect={false}
                autoCapitalize={'none'}
                value={this.state.username}
                />

              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={true}
                value={this.state.password}
                />

                <Button
                  style={styles.button}
                  isLoading={this.props.loginStatus === 'pending'}
                  onPress={() => this.props.onLoginClick(this.state)} >
                  Login
                </Button>

                <Button
                  style={styles.button}
                  onPress={() => this.props.onRegisterClick()} >
                  Register
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 20
    },
    button: {
      height: 40,
      margin: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 65
    },
    header: {
      fontSize: 24,
      textAlign:'center',
    }

});

const mapStateToProps = (state) => {
  return {
    loginStatus: state.contactList.loginStatus
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: (loginData) => {
            dispatch(authActions.login(loginData)).then(function(){
              // Actions.contactList();
            });
        },
        onRegisterClick: () =>{
            Actions.register();
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

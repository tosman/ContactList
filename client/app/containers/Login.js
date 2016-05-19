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
    Image,
    View,
    PropTypes,
    TextInput
} from 'react-native';
import {connect} from 'react-redux';
import mapValues from 'lodash/mapValues';
import * as authActions from '../actions/authActionCreators'
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button'
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

class Login extends Component {
    state = {
      username: null,
      password: null,
    }
    constructor(props) {
        super(props);
    }
    render(){
      return (
          <View style={styles.container}>
              <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
              <View style={styles.header}>
                  <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
              </View>
              <View style={styles.inputs}>
                  <View style={styles.inputContainer}>
                      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                      <TextInput
                          style={[styles.input, styles.whiteFont]}
                          placeholder="Username"
                          placeholderTextColor="#FFF"
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          value={this.state.username}
                          onChangeText={(text) => this.setState({username: text})}

                      />
                  </View>
                  <View style={styles.inputContainer}>
                      <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                      <TextInput
                          password={true}
                          style={[styles.input, styles.whiteFont]}
                          placeholder="Password"
                          placeholderTextColor="#FFF"
                          onChangeText={(text) => this.setState({password: text})}
                          secureTextEntry={true}
                          value={this.state.password}
                      />
                  </View>
              </View>
              <TouchableHighlight onPress={() => this.props.onLoginClick(this.state)}>

              <View style={styles.signin}>
                  <Text style={styles.whiteFont}>Sign In</Text>

              </View>
            </TouchableHighlight>

              <View style={styles.signup}>
                  <Text style={styles.greyFont}>Don't have an account? </Text>
                    <TouchableHighlight onPress={this.props.onRegisterClick}>
                      <Text style={styles.whiteFont}> Sign Up</Text>
                    </TouchableHighlight>
              </View>
          </View>
      );
    }
}

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})

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

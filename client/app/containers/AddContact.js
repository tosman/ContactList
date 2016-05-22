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
    ScrollView,
    Text,
    Image,
    View,
    PropTypes,
    TextInput,
    requireNativeComponent
} from 'react-native';
import {connect} from 'react-redux';
import mapValues from 'lodash/mapValues';
import * as contactActions from '../actions/contactActionCreators'
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button'
var ImagePickerManager = require('NativeModules').ImagePickerManager;
import ContactEmptyImage from '../components/ContactEmptyImage';

class AddContact extends Component {
    state = {
      email: null,
      name: null,
      phoneNumber: null
    }
    constructor(props) {
        super(props);
    }


    addClick(){
      this.props.onAddClick({
        image: this.state.image,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        name: this.state.name
      });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
              <ContactEmptyImage onSelectImage={(image) => this.setState({image})}/>
              <View style={styles.form}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({email: text})}
                autoCorrect={false}
                placeholder={"Email"}
                autoCapitalize={'none'}
                value={this.state.email}
                />

              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({name: text})}
                placeholder={"Name"}
                value={this.state.name}
                />

                <TextInput
                  style={styles.input}
                  placeholder={"Phone Number"}
                  onChangeText={(text) => this.setState({phoneNumber: text})}
                  value={this.state.phoneNumber}
                  />


                <Button
                  style={styles.button}
                  isLoading={this.props.loginStatus === 'pending'}
                  onPress={() => this.addClick()} >
                  Login
                </Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
      height:250,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      flex:1
    },
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
    form:{
    },
    header: {
      fontSize: 24,
      textAlign:'center',
    }

});

const mapStateToProps = (state) => {
  return {
    addContactStatus: state.contactList.addContactStatus
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddClick: (data) => {
            dispatch(contactActions.addContact(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);

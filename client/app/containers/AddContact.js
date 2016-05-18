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
import * as contactActions from '../actions/contactActionCreators'
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button'

class AddContact extends Component {
    state = {
      email: null,
      name: null,
      phoneNumber: null
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.header}> Add Contact </Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({email: text})}
                autoCorrect={false}
                autoCapitalize={'none'}
                value={this.state.email}
                />

              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({name: text})}
                value={this.state.name}
                />

                <TextInput
                  style={styles.input}

                  onChangeText={(text) => this.setState({phoneNumber: text})}
                  value={this.state.phoneNumber}
                  />

                <Button
                  style={styles.button}
                  isLoading={this.props.loginStatus === 'pending'}
                  onPress={() => this.props.onAddClick(this.state)} >
                  Login
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  PropTypes
} from 'react-native';
import { connect } from 'react-redux';



class ContactListApp extends Component {
  static propTypes = {
    routes: PropTypes.object,
    contactList: PropTypes.object
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hi
          {this.props.routes.scene.title}
          {this.props.contactList.contactsById[1].name}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(({contactList, routes}) => ({contactList, routes}))(ContactListApp);

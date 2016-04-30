/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  ListView
  Text,
  View,
  PropTypes
} from 'react-native';
import { connect } from 'react-redux';
import mapValues from 'lodash/object/mapValues';

class ContactDetail extends Component {
  static propTypes = {
    contactList: PropTypes.object
  };
  render() {
    return (
      <View style={styles.container}>
          <Text>

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

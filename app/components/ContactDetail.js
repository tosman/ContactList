/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 import React, {TouchableHighlight, AppRegistry, Component, StyleSheet, ListView, Text, View, PropTypes} from 'react-native';
 import { connect } from 'react-redux';


class ContactDetail extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  render() {
    this.contact = this.props.contactList.contactsById[this.props.id];

    return (
        <View style={styles.container}>
          <View style={styles.headerInfo}>
            <Text>
              {this.contact.name}
            </Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 64
  },
  headerInfo: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#FDFDFD',
  },

  contactDetails: {
    flex: 2
  }
});

export default connect(contactList => contactList)(ContactDetail);

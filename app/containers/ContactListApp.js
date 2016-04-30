/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {TouchableHighlight, AppRegistry, Component, StyleSheet, ListView, Text, View, PropTypes} from 'react-native';
import {connect} from 'react-redux';
import mapValues from 'lodash/object/mapValues';
import * as actions from '../actions/contactActionCreators'

class ContactListApp extends Component {
  constructor(props) {
    super(props);
    this.dataSource =  new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })

    setTimeout(() => this.props.dispatch(actions.addContact('Christine Thurber')), 2000)
  }

  pressRow (rowData) {}

  renderRow (rowData) {
    return(
      <TouchableHighlight onPress={() => this.pressRow(rowData)} underlayColor='#ddd'>
        <View style={styles.row}>
          <Text>
            {rowData.name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
  render () {
    const dataSource = this.dataSource.cloneWithRows(Object.values(this.props.contactList.contactsById))

    return(
      <View style={styles.container}>
        <ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)}></ListView>
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
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 18,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7'
  }
});

export default connect(contactList => contactList)(ContactListApp);

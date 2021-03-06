/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {ActivityIndicatorIOS, TouchableHighlight, AppRegistry, Component, StyleSheet, ListView, Text, View, PropTypes} from 'react-native';
import { connect } from 'react-redux';
import mapValues from 'lodash/mapValues';
import * as contactActions from '../actions/contactActionCreators'
import ContactRow from '../components/ContactRow'
import { Actions } from 'react-native-router-flux';
import { ControlledRefreshableListView } from 'react-native-refreshable-listview';

class ContactListApp extends Component {

  constructor(props) {
    super(props);
    this.dataSource =  new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })

  }
  componentDidMount(){
    this.props.dispatch(contactActions.requestContacts());

  }
  renderRow (contact) {
    return(
      <ContactRow
        selectContact={this.props.onContactClick}
        {...contact}
        />
    )
  }

  renderHeader(){
    if (this.props.contactList.isFetching) {
     return (
     <View style={ styles.wrapper}>
       <View style={styles.loading}>
         <Text>{this.props.refreshDescription}</Text>
         <ActivityIndicatorIOS />
       </View>
     </View>
     )
   } else {
     return null;
   }
  }

  render () {
    const dataSource = this.dataSource.cloneWithRows(Object.values(this.props.contactList.contactsById))


    return(
      <View style={styles.container}>

        <ListView
          dataSource={dataSource}
          renderRow={(data) => this.renderRow(data)}

       />

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
  wrapper: {
    marginTop: 10
  },
  loading: {
    height: 30
 },
});

const mapStateToProps = (state) => {
  return {
    contactList: state.contactList
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
     onContactClick: id => {dispatch(contactActions.requestContactDetail(id)); Actions.contactDetail(id)},
     addContact: name => dispatch(contactActions.addContact(name)),
     requestContacts: () => contactActions.requestContacts()
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactListApp);

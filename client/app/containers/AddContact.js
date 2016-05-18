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
    TextInput,
    requireNativeComponent
} from 'react-native';
import {connect} from 'react-redux';
import mapValues from 'lodash/mapValues';
import * as contactActions from '../actions/contactActionCreators'
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button'
var ImagePickerManager = require('NativeModules').ImagePickerManager;

class AddContact extends Component {
    state = {
      email: null,
      name: null,
      phoneNumber: null
    }
    constructor(props) {
        super(props);
    }
    selectImage(){
      var options = {
        title: 'Select Avatar', // specify null or empty string to remove the title
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
        chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
        customButtons: {
          'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
        },
        cameraType: 'back', // 'front' or 'back'
        mediaType: 'photo', // 'photo' or 'video'
        videoQuality: 'high', // 'low', 'medium', or 'high'
        durationLimit: 10, // video recording max time in seconds
        maxWidth: 100, // photos only
        maxHeight: 100, // photos only
        aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
        aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
        quality: 0.2, // 0 to 1, photos only
        angle: 0, // android only, photos only
        allowsEditing: false, // Built in functionality to resize/reposition the image after selection
        noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
        storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
          skipBackup: true, // ios only - image will NOT be backed up to icloud
          path: 'images' // ios only - will save image at /Documents/images rather than the root
        }
      };

      ImagePickerManager.launchImageLibrary(options, (response) => {
        console.log(response);
      });
    }
    render() {
        return (
            <View style={styles.container}>
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
                  onPress={() => this.selectImage()} >
                  Select image
                </Button>


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

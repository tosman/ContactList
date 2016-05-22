/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    TouchableHighlight,
    AppRegistry,
    Component,
    StyleSheet,
    ListView,
    Text,
    View,
    PropTypes,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var ImagePickerManager = require('NativeModules').ImagePickerManager;

export default class ContactEmptyImage extends Component {
    static propTypes = {
        onSelectImage: PropTypes.func.isRequired
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
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({source: source, image: response.data});
        this.props.onSelectImage(response.data);
      });
    }

    currentImage(){

    }

    render() {
      let view;

      if(this.state && this.state.source){
        view =
        (<TouchableHighlight onPress={() => this.selectImage()}>
          <View><Image style={styles.image}  source={this.state.source}/>
          <Icon style={styles.iconOverImage} name="camera" size={25} /></View>
        </TouchableHighlight>);
      } else {
        view =
        (<TouchableHighlight style={styles.emptyImage} onPress={() => this.selectImage()}>
            <Icon name="camera" size={100} color="#FF3366" />
        </TouchableHighlight>);
      }


        return(
              <View style={styles.container}>
                {view}
              </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    emptyImage: {
      backgroundColor: '#dedede',
      padding: 50,
      alignItems: 'center'
    },
    iconOverImage: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    image: {
      height:250,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
});

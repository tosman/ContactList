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
import {connect} from 'react-redux';

class ContactDetail extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }

    render() {
        this.contact = this.props.contactList.contactsById[this.props.id];

        return (
            <View style={styles.container}>
                <View style={styles.headerInfo}>
                    <Image style={styles.image} resizeMode="contain" source={{
                        uri: this.contact.photo || 'https://cdn0.vox-cdn.com/images/verge/default-avatar.v9899025.gif'
                    }}/>
                </View>
                <View style={styles.contactDetails}>
                    <Text style={styles.contactName}>{this.contact.name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contactName: {
        fontSize: 22
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 55
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row'
    },
    contactDetails: {
        flex: 2,
        padding: 8
    }
});

export default connect(contactList => contactList)(ContactDetail);

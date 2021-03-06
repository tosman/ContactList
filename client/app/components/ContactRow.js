/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    Image,
    TouchableHighlight,
    AppRegistry,
    Component,
    StyleSheet,
    ListView,
    Text,
    View,
    PropTypes
} from 'react-native';
import {settings} from '../settings';

export default class ContactRow extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        selectContact: PropTypes.func.isRequired
    }

    selectContact() {
        this.props.selectContact({id: this.props.id});
    }
    render() {

        return (
            <TouchableHighlight onPress={() => this.selectContact()} underlayColor='#ddd'>
                <View style={styles.row}>
                    <Image style={styles.image} source={{
                      uri: 'http://localhost:8000/api/contact/image/' + this.props.id
                    }}/>
                    <View style={styles.right}>
                        <Text style={styles.name}>
                            {this.props.name}
                        </Text>
                        <Text style={styles.detail}>
                            {this.props.phoneNumber}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    image: {
        margin: 8,
        width: 40,
        height: 40,
        borderRadius: 20
    },
    detail: {
        fontSize: 14,
        color: 'grey'
    },
    name: {
        fontSize: 16
    },
    right: {
        paddingTop: 10,
        paddingLeft: 5,
        flexDirection: 'column'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#d7d7d7'
    }
});

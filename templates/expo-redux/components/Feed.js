import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

// TODO:(tk) remove, modifty, etc

const Feed = ({
    onDetailsPress,
}) => (
    <View style={styles.container}>
        <Text>Feed.js</Text>
        <TouchableHighlight style={styles.button} onPress={onDetailsPress}>
            <Text style={{ color: 'white' }}>Go to Details</Text>
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#218c74',
        marginTop: 30,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
});

export default Feed;

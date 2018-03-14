import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

// TODO:(tk) remove, modifty, etc

const Details = () => (
    <View style={styles.container}>
        <Text>Details.js</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Details;

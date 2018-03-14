import React from 'react';
import { connect } from 'react-redux';
import Details from '@components/Details';
import compose from 'lodash/fp/compose';
import withNavigationOptions from '@utils/with-navigation-options';
import { Text } from 'react-native';

// TODO:(tk) rename file, remove, etc 

const mapStateToProps = (state, ownProps) => {

    return {

    };
};

const mapActionCreators = {

};

export default compose(
    withNavigationOptions(() => ({
        headerTintColor: 'white',
        headerTitle: <Text>Details</Text>,
    })),
    connect(mapStateToProps, mapActionCreators)
)(Details);

import React from 'react';
import { connect } from 'react-redux';
import Feed from '@components/Feed';
import compose from 'lodash/fp/compose';
import withProps from 'recompose/withProps';

// TODO:(tk) rename file, remove, etc

const mapStateToProps = (state, ownProps) => {

    return {

    };
};

const mapActionCreators = {
    
};

export default compose(
    connect(mapStateToProps, mapActionCreators),
    withProps(({ navigation }) => ({
        onDetailsPress: () => navigation.navigate('Details'),
    }))
)(Feed);

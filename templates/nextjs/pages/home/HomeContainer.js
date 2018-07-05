import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withGetInitialProps from '../../utils/with-get-initial-props';
import withLayout from '../../utils/with-layout';
import Home from './Home';
import DefaultLayout from '../../layouts/DefaultLayout';

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const getInitialProps = async function ({ store, req }) {

};

export default compose(
    connect(mapStateToProps),
    withGetInitialProps(getInitialProps),
    withLayout(DefaultLayout)
)(Home);

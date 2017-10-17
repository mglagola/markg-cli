import withRedux from 'next-redux-wrapper';
import compose from 'recompose/compose';
import createStore from '../../store/create-store';
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
    withRedux(createStore, mapStateToProps, null),
    withGetInitialProps(getInitialProps),
    withLayout(DefaultLayout)
)(Home);

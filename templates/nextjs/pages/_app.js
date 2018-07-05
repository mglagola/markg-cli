import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from 'next-redux-wrapper';
import createStore from '../store/create-store';

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        const res = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return res;
    }

    render() {
        const { Component, store, ...props } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...props} />
                </Provider>
            </Container>
        );
    }

}

export default withRedux(createStore)(MyApp);

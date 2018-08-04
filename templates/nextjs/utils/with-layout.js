const withLayout = (LayoutComponent) => (WrappedComponent) => {
    const WithLayout = (props) => (
        <LayoutComponent>
            <WrappedComponent {...props} />
        </LayoutComponent>
    );
    WithLayout.propTypes = WrappedComponent.propTypes;
    WithLayout.getInitialProps = WrappedComponent.getInitialProps;
    return WithLayout;
};

export default withLayout;

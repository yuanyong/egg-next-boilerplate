import React from 'react';
import { Provider } from 'react-redux';
import model from './model/index';
import dva, { connect } from 'dva-no-router';

const checkServer = () =>
    Object.prototype.toString.call(global.process) === '[object process]';

const __NEXT_DVA_STORE__ = '__NEXT_DVA_STORE__';

function createDvaStore(initialState: any) {
    let app: any;
    if (initialState) {
        app = dva({
            initialState,
        });
    } else {
        app = dva({});
    }
    const isArray = Array.isArray(model);
    if (isArray) {
        model.forEach((m: any) => {
            app.model(m);
        });
    } else {
        app.model(model);
    }
    app.router(() => { });
    app.start();
    // console.log(app);
    const store = app._store;
    return store;
}

function getOrCreateStore(initialState: any) {
    const isServer = checkServer();
    if (isServer) {
        // run in server
        return createDvaStore(initialState);
    }
    if (!(window as any)[__NEXT_DVA_STORE__]) {
        // run in client
        (window as any)[__NEXT_DVA_STORE__] = createDvaStore(initialState);
    }
    return (window as any)[__NEXT_DVA_STORE__];
}

export default function withDva(...args: any[]) {
    return function CreateNextPage(Component: any) {
        const ComponentWithDva = (props: any = {}) => {
            const { store, initialProps, initialState } = props;
            const ConnectedComponent = connect(...args)(Component);
            const storeValue = store && store.dispatch ? store : getOrCreateStore(initialState);
            return React.createElement(
              Provider,
              // in client side, it will init store with the initial state tranfer from server side
              { store: storeValue },
              // transfer next.js's props to the page
              React.createElement(ConnectedComponent, initialProps),
            );
        };

        ComponentWithDva.getInitialProps = async (props: any = {}) => {
            const isServer = checkServer();
            const store = getOrCreateStore(props.jsonPageRes);
            // call children's getInitialProps
            // get initProps and transfer in to the page
            const initialProps = Component.getInitialProps
                ? await Component.getInitialProps({ ...props, isServer, store })
                : {};
            return {
                store,
                initialProps,
                initialState: store.getState(),
            };
        };
        return ComponentWithDva;
    };
}

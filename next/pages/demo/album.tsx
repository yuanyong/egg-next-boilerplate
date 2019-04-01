import React, { Component } from 'react';
import WithDva from '../../store';

class Page extends Component {
    static async getInitialProps(props: any) {
        // first time run in server side
        // other times run in client side ( client side init with default props
        // console.log('get init props');
        const { pathname, query, isServer, store } = props;
        // dispatch effects to fetch data here
        await props.store.dispatch({ type: 'albums/init' });
        // dont use store as property name, it will confilct with initial store
        return {
            pathname,
            query,
            isServer,
            dvaStore: store,
        };
    }

    render() {
        const dataList = (this.props as any).albums.list;
        return (
            <div>
                {dataList.map((item: any) => {
                    return <div key={item.id}>(title={item.title} /></div>;
                })}
            </div>
        );
    }
}

export default WithDva((state: any) => {
    return { albums: state.albums };
})(Page);

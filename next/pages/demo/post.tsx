import React, { Component } from 'react';
import WithDva from '../../store';

class Page extends Component {
    static async getInitialProps(props: any) {
        // first time run in server side
        // other times run in client side ( client side init with default props
        const { pathname, query, isServer, store } = props;

        await props.store.dispatch({ type: 'posts/init' });

        return {
            pathname,
            query,
            isServer,
            dvaStore: store,
        };
    }

    render() {
        const { posts } = this.props as any;
        return (
            <div>
                {posts.list.map((item: any) => {
                    return (<div key={item.id}>
                        <div>{item.title}</div>
                        <div>{item.body} </div>
                    </div>);
                })}
            </div>
        );
    }
}

export default WithDva((state: any) => {
    return { posts: state.posts };
})(Page);

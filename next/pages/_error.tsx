import React from 'react';

export default class Error extends React.Component {
    static getInitialProps({ res, err }: { res: any; err: any }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    }

    render() {
        const { statusCode } = this.props as any;
        return (
            <p>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
        );
    }
}

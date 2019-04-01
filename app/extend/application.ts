import * as next from 'next';

// tslint:disable-next-line: no-var-requires
const debug = require('debug')('egg-next:extend:application.js');

const NextSymbol = Symbol.for('EGG-NEXT');

export default {
    get next(): next.Server {
        if (!this[NextSymbol]) {
            debug('[egg-next] create next instance!');
            const dev = process.env.NODE_ENV !== 'production';
            this[NextSymbol] = next({ dev, dir: './next' });
        }
        return this[NextSymbol];
    },
};

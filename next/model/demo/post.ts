import { queryPosts, queryPostById } from '../../services/api';

// const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout))

const model = {
    namespace: 'posts',
    state: {
        init: false,
        list: [],
        item: {},
    },
    reducers: {
        fetch(state: any, action: any) {
            const { payload } = action;
            return { ...state, list: payload };
        },
        fetchItem(state: any, action: any) {
            const { payload } = action;
            return { ...state, item: payload };
        },
    },
    effects: {
        *init(action: any, { put }: { put: any}) {
            // yield delay(2000)
            const data = yield queryPosts();
            yield put({
                type: 'fetch',
                payload: data,
            });
        },
        *initItem(action: any, { put }: { put: any}) {
            const { id } = action.payload;
            const data = yield queryPostById(id);
            yield put({
                type: 'fetchItem',
                payload: data,
            });
        },
    },
};

export default model;

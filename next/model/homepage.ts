const delay = (timeout: number) =>
    new Promise(resolve => setTimeout(resolve, timeout));

const model = {
    namespace: 'index',
    state: {
        name: 'test',
        count: 0,
        init: false,
    },
    reducers: {
        caculate(state: any, payload: any) {
            const { count } = state;
            const { delta } = payload;
            return { ...state, count: count + delta };
        },
    },
    effects: {
        *init(_action: any, { put }: { put: any }) {
            yield delay(2000);
            yield put({ type: 'caculate', delta: 1 });
        },
    },
};

export default model;

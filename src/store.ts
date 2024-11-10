import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            account: null,
        }
    },
    mutations: {
        setAccount(state, value) {
            state.account = value;
        },
        setCachedVehicle(state, value) {
            state.cachedVehicle = value;
        }
    }
});

export default store;
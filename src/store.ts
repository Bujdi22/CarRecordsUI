import { createStore } from 'vuex';
import {Account} from "@/interfaces/Account";

const store = createStore({
    state() {
        return {
            account: {} as Account | null,
            cachedVehicle: null,
            cachedRecord: null,
        }
    },
    mutations: {
        setAccount(state, value) {
            state.account = value;
        },
        setCachedVehicle(state, value) {
            state.cachedVehicle = value;
        },
        setCachedRecord(state, value) {
            state.cachedRecord = value;
        }
    }
});

export default store;
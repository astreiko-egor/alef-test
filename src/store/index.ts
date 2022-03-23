import Vuex, { StoreOptions } from 'vuex';
import { IRootState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';

const store: StoreOptions<IRootState> = {
    state: {
        preview: {
            parentInfo: {
                name: '',
                age: '',
            },
            childrens: [],
        },
        fields: {
            parentInfo: {
                name: '',
                age: '',
            },
            childrens: [],
        },
    },
    getters,
    mutations,
    actions,
};

export default new Vuex.Store<IRootState>(store);

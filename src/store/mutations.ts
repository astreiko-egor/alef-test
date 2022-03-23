import { MutationTree } from 'vuex';
import { IRootState, IGroupData, IData, IEditChild } from './types';

export enum MutationsTitle {
    SET_PREVIEW_DATA = 'SET_PREVIEW_DATA',

    SET_FIELD_PARENT_NAME = 'SET_FIELD_PARENT_NAME',
    SET_FIELD_PARENT_AGE = 'SET_FIELD_PARENT_AGE',

    SET_ADD_FIELD_CHILD = 'SET_ADD_FIELD_CHILD',
    SET_EDIT_FIELD_CHILD = 'SET_EDIT_FIELD_CHILD',
    SET_REMOVE_FIELD_CHILD = 'SET_REMOVE_FIELD_CHILD',

    SET_CLEAR_FIELDS = 'SET_CLEAR_FIELDS',
}

export const mutations: MutationTree<IRootState> = {
    [MutationsTitle.SET_PREVIEW_DATA]: (state, payload: IGroupData) => {
        state.preview.parentInfo = payload.parentInfo;
        state.preview.childrens = payload.childrens;
    },

    [MutationsTitle.SET_FIELD_PARENT_NAME]: (state, payload: string) => {
        state.fields.parentInfo.name = payload;
    },

    [MutationsTitle.SET_FIELD_PARENT_AGE]: (
        state,
        payload: string | number
    ) => {
        state.fields.parentInfo.age = payload;
    },

    [MutationsTitle.SET_ADD_FIELD_CHILD]: (state, payload: IData) => {
        state.fields.childrens.push(payload);
    },

    [MutationsTitle.SET_EDIT_FIELD_CHILD]: (state, payload: IEditChild) => {
        const findChildren = state.fields.childrens.find(
            (child) => child.id === payload.id
        );
        if (findChildren) {
            findChildren[payload.filed] = payload.value;
        }
    },

    [MutationsTitle.SET_REMOVE_FIELD_CHILD]: (
        state,
        payload: string | number
    ) => {
        state.fields.childrens = state.fields.childrens.filter(
            (item) => item.id !== payload
        );
    },

    [MutationsTitle.SET_CLEAR_FIELDS]: (state) => {
        state.fields = {
            parentInfo: {
                name: '',
                age: '',
            },
            childrens: [],
        };
    },
};

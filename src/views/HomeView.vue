<template>
    <div class="container">
        <app-row
            class="min-h-[calc(100vh-318px)] grid-rows-[repeat(4,_max-content),_auto] grid-cols-12 md:gap-x-8"
            :is-custom="true">
            <h2
                class="col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 text-16 text-black font-medium mb-5">
                Персональные данные
            </h2>
            <div
                class="flex flex-col col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 mb-[30px]">
                <app-input
                    class="mb-[10px]"
                    v-model:propsValue="parentName"
                    :replace="/[^A-Za-zА-Яа-яЁё]/g"
                    placeholder="Имя" />
                <app-input
                    v-model:propsValue="parentAge"
                    :replace="/[^\d]/g"
                    placeholder="Возраст" />
            </div>

            <div
                class="col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 overflow-hidden mb-[10px]">
                <div class="flex items-center flex-wrap -m-3 justify-between">
                    <h2 class="text-16 text-black font-medium m-3">
                        Дети (макс. 5)
                    </h2>

                    <app-btn
                        class="m-3"
                        before-icon="plus"
                        styles="secondary"
                        round="large"
                        :is-disabled="isDisabledAddChild"
                        text="Добавить ребенка"
                        @click="addChildren" />
                </div>
            </div>

            <transition-group
                name="list"
                tag="div"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
                class="flex flex-col col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 mb-[30px]">
                <div
                    class="grid grid-cols-1 gap-y-1 md:gap-y-0 md:grid-cols-[1fr_1fr_auto] gap-x-[18px] mb-[10px] last:mb-0"
                    v-for="child in listChildrens"
                    :key="child.id">
                    <app-input
                        class=""
                        :propsValue="child.name"
                        :replace="/[^A-Za-zА-Яа-яЁё]/g"
                        @input="editChild(child.id, 'name', $event)"
                        placeholder="Имя" />
                    <app-input
                        class=""
                        :propsValue="child.age"
                        :replace="/[^\d]/g"
                        @input="editChild(child.id, 'age', $event)"
                        placeholder="Возраст" />
                    <button
                        class="inline-flex items-center justify-center text-14 text-primary py-[10px] px-5 md:py-0 md:px-0"
                        @click="removeChild(child.id)">
                        Удалить
                    </button>
                </div>
            </transition-group>

            <div
                class="flex col-span-full md:col-start-3 lg:col-start-4 items-end overflow-hidden">
                <div class="flex flex-wrap items-center -m-2">
                    <app-btn
                        class="w-full md:w-max m-2"
                        round="large"
                        :is-load="false"
                        :is-disabled="isDisabledSave"
                        text="Сохранить"
                        @click="saveData" />
                    <button
                        v-if="isHiddenClearForm"
                        class="inline-flex items-center justify-center text-14 text-primary py-[10px] px-5 md:py-0 md:px-0 m-2"
                        @click="clearForm">
                        Очистить форму
                    </button>
                </div>
            </div>
        </app-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { v4 as uuid4 } from 'uuid';
import { useStore } from 'vuex';
import { MutationsTitle } from '@/store/mutations';
import { IChildren } from '@/types';

export default defineComponent({
    name: 'HomeView',
    components: {
        AppInput: defineAsyncComponent(
            () => import('@/components/AppInput/AppInput.vue')
        ),
        AppRow: defineAsyncComponent(
            () => import('@/components/AppRow/AppRow.vue')
        ),
        AppBtn: defineAsyncComponent(
            () => import('@/components/AppBtn/AppBtn.vue')
        ),
    },
    setup() {
        const store = useStore();

        const parentName = computed({
            get: (): string => {
                return store.state.fields.parentInfo.name;
            },
            set: (value): void => {
                store.commit(MutationsTitle.SET_FIELD_PARENT_NAME, value);
            },
        });
        const parentAge = computed({
            get: (): string => {
                return store.state.fields.parentInfo.age;
            },
            set: (value): void => {
                store.commit(MutationsTitle.SET_FIELD_PARENT_AGE, value);
            },
        });

        const listChildrens = computed(() => {
            return JSON.parse(JSON.stringify(store.state.fields.childrens));
        });
        const isDisabledAddChild = computed(() => {
            return listChildrens.value.length >= 5;
        });
        const addChildren = () => {
            store.commit(MutationsTitle.SET_ADD_FIELD_CHILD, {
                id: uuid4(),
                name: '',
                age: '',
            });
        };
        const editChild = (id: string, filed: string, event: Event) => {
            store.commit(MutationsTitle.SET_EDIT_FIELD_CHILD, {
                id,
                filed,
                value: (event.target as HTMLInputElement).value,
            });
        };
        const removeChild = (id: string) => {
            store.commit(MutationsTitle.SET_REMOVE_FIELD_CHILD, id);
        };

        const isHiddenClearForm = computed(() => {
            if (listChildrens.value.length === 0) {
                return parentName.value !== '' || parentAge.value !== '';
            } else {
                const findEmptyField = listChildrens.value.find(
                    (child: IChildren) => child.name !== '' || child.age !== ''
                );
                return findEmptyField
                    ? true
                    : parentName.value !== '' || parentAge.value !== '';
            }
        });
        const isDisabledSave = computed(() => {
            if (listChildrens.value.length === 0) {
                return parentName.value === '' || parentAge.value === '';
            } else {
                const findEmptyField = listChildrens.value.find(
                    (child: IChildren) => child.name === '' || child.age === ''
                );
                return findEmptyField
                    ? true
                    : parentName.value === '' || parentAge.value === '';
            }
        });
        const saveData = () => {
            store.commit(MutationsTitle.SET_PREVIEW_DATA, {
                parentInfo: {
                    name: parentName.value,
                    age: parentAge.value,
                },
                childrens: listChildrens.value,
            });
        };
        const clearForm = () => {
            store.commit(MutationsTitle.SET_CLEAR_FIELDS);
        };

        return {
            parentName,
            parentAge,

            listChildrens,
            isDisabledAddChild,
            addChildren,
            editChild,
            removeChild,

            isDisabledSave,
            isHiddenClearForm,
            saveData,
            clearForm,
        };
    },
});
</script>

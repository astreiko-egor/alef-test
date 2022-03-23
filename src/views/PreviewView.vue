<template>
    <div class="container">
        <app-row v-if="isShowParentInfo">
            <h2
                class="col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 text-16 text-black font-medium mb-5">
                Персональные данные
            </h2>
            <span
                class="col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 text-16 text-black font-bold mb-[60px]">
                {{ store.state.preview.parentInfo.name }},
                {{ declinationAge(store.state.preview.parentInfo.age) }}
            </span>
            <h2
                v-if="isShowChildrensInfo"
                class="col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 text-16 text-black font-medium mb-5">
                Дети
            </h2>
            <div
                v-if="isShowChildrensInfo"
                class="col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 flex flex-col items-start">
                <span
                    v-for="child in listChildrens"
                    :key="child.id"
                    class="py-[10px] px-5 bg-gray-l rounded-[5px] text-16 text-black font-bold mb-5 last:mb-0 animate__animated animate__fadeIn">
                    {{ child.name }}, {{ declinationAge(child.age) }}
                </span>
            </div>
        </app-row>
        <span
            v-else
            class="flex items-center justify-center col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 text-red">
            Нет данных
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { IChildren } from '@/types';

export default defineComponent({
    name: 'PreviewView',

    components: {
        AppRow: defineAsyncComponent(
            () => import('@/components/AppRow/AppRow.vue')
        ),
    },
    setup() {
        const store = useStore();

        const isShowParentInfo = computed(() => {
            return (
                store.state.preview.parentInfo.name &&
                store.state.preview.parentInfo.age
            );
        });

        const listChildrens = computed(() => {
            return store.state.preview.childrens.filter(
                (child: IChildren) => child.name !== '' && child.age !== ''
            );
        });
        const isShowChildrensInfo = computed(() => {
            return listChildrens.value.length;
        });

        const declinationAge = (age: string | number) => {
            const cases = [2, 0, 1, 1, 1, 2];
            const declination = [' год', ' года', ' лет'];
            return (
                age +
                declination[
                    +age % 100 > 4 && +age % 100 < 20
                        ? 2
                        : cases[+age % 10 < 5 ? +age % 10 : 5]
                ]
            );
        };
        return {
            store,

            isShowParentInfo,

            listChildrens,
            isShowChildrensInfo,

            declinationAge,
        };
    },
});
</script>

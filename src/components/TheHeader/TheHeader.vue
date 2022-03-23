<template>
    <header class="py-6 shadow-bottomLine">
        <div class="container">
            <app-row>
                <router-link
                    to="/"
                    class="flex justify-center col-span-full mb-3 md:mb-0 md:col-span-2">
                    <img
                        :src="require(`@/assets/img/logo.svg`)"
                        alt="logo"
                        class="max-w-full" />
                </router-link>
                <ul
                    class="col-span-full md:col-span-10 flex justify-center md:justify-end lg:justify-center list-none">
                    <li class="mr-6">
                        <router-link
                            to="/"
                            class="hover:text-primary-hover"
                            extend
                            :class="{
                                'text-primary pointer-events-none':
                                    $route.name === 'home',
                                'text-gray': $route.name !== 'home',
                            }"
                            >Форма</router-link
                        >
                    </li>
                    <li>
                        <router-link
                            to="preview"
                            class="hover:text-primary-hover"
                            :class="{
                                'text-primary pointer-events-none':
                                    $route.name === 'preview',
                                'text-gray': $route.name !== 'preview',
                            }"
                            >Превью</router-link
                        >
                    </li>
                </ul>
            </app-row>
        </div>
    </header>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
export default defineComponent({
    name: 'TheHeader',
    components: {
        AppRow: defineAsyncComponent(
            () => import('@/components/AppRow/AppRow.vue')
        ),
    },
});
</script>

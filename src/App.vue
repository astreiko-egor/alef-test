<template>
    <the-header class="flex-shrink-0 mb-[30px]" />
    <main class="flex-grow">
        <router-view />
    </main>
    <the-footer class="flex-shrink-0" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
    name: 'App',
    components: {
        TheHeader: defineAsyncComponent(
            () => import('@/components/TheHeader/TheHeader.vue')
        ),
        TheFooter: defineAsyncComponent(
            () => import('@/components/TheFooter/TheFooter.vue')
        ),
    },
});
</script>

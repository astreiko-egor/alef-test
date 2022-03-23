<template>
    <div
        class="grid max-w-full"
        :class="{ 'grid-cols-12 md:gap-x-8': !isCustom }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppRow',
    props: {
        isCustom: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

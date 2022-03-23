<template>
    <svg @click="$emit('click')" aria-hidden="true">
        <use
            :xlink:href="`${require('@/assets/img/sprite.svg')}#${icon}`"></use>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppSvgSprite',
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
});
</script>

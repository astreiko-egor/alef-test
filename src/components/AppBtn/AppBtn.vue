<template>
    <component
        :is="href ? 'a' : to ? 'nuxt-link' : 'button'"
        :href="href"
        :to="to"
        :disabled="isDisabled"
        class="inline-flex items-center justify-center ease duration-300"
        :class="[addClass, { 'pointer-events-none': isLoad }]">
        <span
            v-if="isLoad"
            class="w-6 h-6 animate__animated animate__rotate animate__infinite">
            <app-svg-sprite icon="btn-loading" class="w-6 h-6" />
        </span>
        <app-svg-sprite
            v-if="beforeIcon && !isLoad"
            :icon="beforeIcon"
            class="w-6 h-6 p-[3.51px] mr-1 last:mr-0" />
        <slot v-if="!isLoad" name="beforeText"></slot>
        <span v-if="text && !isLoad" class="mr-1 last:mr-0">{{ text }}</span>
        <slot v-if="!isLoad" name="afterText"></slot>
        <app-svg-sprite
            v-if="afterIcon && !isLoad"
            :icon="afterIcon"
            class="w-5 h-5" />
    </component>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';

export default defineComponent({
    name: 'AppBtn',
    props: {
        styles: {
            type: String,
            default: 'primary',
            validator: (value: string) => {
                return [
                    'primary',
                    'primary-white',
                    'secondary',
                    'secondary-white',
                    'secondary-dark',
                    'flat',
                    'flat-white',
                ].includes(value);
            },
        },
        // Если необходима ссылка
        href: {
            type: String,
        },
        // Если необходима router-link
        to: {
            type: String,
        },
        // Если необходимо сделать кнопку disabled
        isDisabled: {
            type: Boolean,
            default: false,
        },
        // Иконка переде текстом (если необходима)
        beforeIcon: {
            type: String,
        },
        // Текст кнопки (если необходим)
        text: {
            type: String,
        },
        // Иконка после текста (если необходима)
        afterIcon: {
            type: String,
        },
        // Скругленние кнопки
        round: {
            type: String,
            default: 'small',
            validator: (value: string) => {
                return ['small', 'large'].includes(value);
            },
        },
        // Показывать лоадер или нет
        isLoad: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        AppSvgSprite: defineAsyncComponent(
            () => import('@/components/AppSvgSprite/AppSvgSprite.vue')
        ),
    },
    setup(props) {
        const addClass = computed(() => {
            let classes;
            switch (props.styles) {
                case 'primary':
                    classes = `
                    bg-primary 
                    text-white 
                    text-14 
                    hover:bg-primary-hover 
                    hover:border-primary-hover 
                    active:bg-primary-active 
                    active:border-primary-active 
                    disabled:bg-primary-disabled 
                    disabled:border-primary-disabled 
                    border-2 
                    border-solid 
                    border-primary`;
                    classes += props.isDisabled
                        ? ' pointer-events-none'
                        : ' cursor-pointer';
                    classes +=
                        props.round === 'small'
                            ? ' rounded'
                            : props.round === 'large'
                            ? ' rounded-full'
                            : '';
                    classes += props.text
                        ? ' py-[10px] px-5'
                        : ' py-[10px] px-[10px]';
                    break;
                case 'primary-white':
                    break;
                case 'secondary':
                    classes = `
                    bg-transparent 
                    text-primary 
                    text-14 
                    hover:bg-[#6E41E2]/[0.04]
                    active:bg-[#6E41E2]/[0.16] 
                    disabled:opacity-[0.56]
                    border-2 
                    border-solid 
                    border-primary
                    blur:border-solid`;
                    classes += props.isDisabled
                        ? ' pointer-events-none'
                        : ' cursor-pointer';
                    classes +=
                        props.round === 'small'
                            ? ' rounded'
                            : props.round === 'large'
                            ? ' rounded-full'
                            : '';
                    classes += props.text
                        ? ' py-[10px] px-5'
                        : ' py-[10px] px-[10px]';
                    break;
                case 'secondary-white':
                    break;
                case 'secondary-dark':
                    break;
                case 'flat':
                    break;
                case 'flat-white':
                    break;
            }
            return classes;
        });

        return {
            addClass,
        };
    },
});
</script>

<style lang="scss">
.animate__rotate {
    animation-name: 'rotate';
    transform-origin: center;
    animation-delay: 0;
    animation-duration: 1s;
    animation-timing-function: linear;
    transform: rotate(0);
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

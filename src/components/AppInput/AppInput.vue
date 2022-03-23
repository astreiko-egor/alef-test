<template>
    <div
        class="inline-flex bg-white rounded border border-solid border-gray-l ease duration-300 hover:shadow-hover"
        :class="{
            'shadow-none': !isShadow,
            'shadow-hover': isShadow,
            'pointer-events-none': isDisabled,
        }">
        <span
            class="absolute top-1/2 left-4 transform -translate-y-1/2 ease duration-300"
            :class="{
                'text-14 ': !isFocus,
                'text-13 top-0 translate-y-2': isFocus,
                'text-gray': !isDisabled,
                'text-black opacity-25': isDisabled,
            }"
            v-if="placeholder">
            {{ placeholder }}
        </span>
        <input
            class="w-full bg-transparent outline-none px-4 pt-[26px] pb-[6px] text-14 text-black"
            :type="type"
            :value="propsValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @keypress="onPress" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'AppInput',
    props: {
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
        },
        // Передаваемое значение
        propsValue: {
            required: true,
            type: [String, Number],
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        replace: {
            type: RegExp,
        },
    },
    emits: ['update:propsValue'],
    setup(props, { emit }) {
        let isFocus = ref(props.propsValue !== '');
        let isShadow = ref(false);
        let BooleanFocus = ref(false);

        const onFocus = () => {
            isShadow.value = true;
            isFocus.value = true;
            BooleanFocus.value = true;
        };
        const onInput = (event: Event) => {
            const value = props.replace
                ? ((event.target as HTMLInputElement).value = (
                      event.target as HTMLInputElement
                  ).value.replace(props.replace, ''))
                : (event.target as HTMLInputElement).value;

            emit('update:propsValue', value);
        };
        const onBlur = (event: Event) => {
            const value = (event.target as HTMLInputElement).value;
            if (value === '') {
                isFocus.value = false;
            }
            isShadow.value = false;
            BooleanFocus.value = false;
        };

        watch(
            () => props.propsValue,
            (newValue) => {
                if (!BooleanFocus.value) {
                    isFocus.value = newValue !== '';
                }
            }
        );

        return {
            isFocus,
            isShadow,
            onFocus,
            onInput,
            onBlur,
        };
    },
});
</script>

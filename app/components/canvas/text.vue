<template>
<div class="text">
    <div
        class="inputArea"
        @input.stop="inputFunc($event)"
        contenteditable="true"
        :readonly="readonly"
        :placeholder="placeholder"
        :style="styleProps"
    >{{ modelValue }}</div>
    <div class="clear" @click.stop="clearFunc($event)">
        <img src='@/assets/img/text_clear_btn.svg' />
    </div>
</div>
</template>

<script lang="ts" setup>
    import { isEmpty } from "lodash-es";
    const {placeholder, readonly, value, ...styleProps} = defineProps({
        ...transformToComponentProps({ ...textStyleProps, ...textNoStyleProps })
    });

    const modelValue = ref(value);

    function inputFunc(event: Event){
        if (!(event instanceof InputEvent)) {
            return;
        }

        const target = event.target as HTMLInputElement;

        if (event.inputType === 'deleteContentBackward' && (target.innerHTML === '<br>' || isEmpty(target.innerHTML))) {
            target.textContent = '';
            modelValue.value = '';
        } else if (isEmpty(target.innerHTML)) {
            target.textContent = '';
            modelValue.value = '';
        } else {
            modelValue.value = target.innerHTML;
        }
    }
</script>

<style lang="scss" scoped>
.text{
    position: relative;
    
    >.inputArea{
        outline: none;
        word-break: break-all;

        &:empty:before {
            content: attr(placeholder);
            color: gray;
        }
    }

    >.clear{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        height: 100%;

        > img {
            pointer-events: none;
            transition: opacity 0.3s ease;
            height: 100%;
            width: auto;
            aspect-ratio: 1 / 1;
        }
    }
}
</style>
  
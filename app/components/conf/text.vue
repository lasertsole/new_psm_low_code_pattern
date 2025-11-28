<template>
  <div class="Text">
    <textarea v-on="eventHandlers"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { UPDATE_COMPONENT_ENUM } from "@/types";

/****以下是获取默认属性****/
const defaultProps: {
  readonly [key: string]: any;
} = transformToComponentProps({ ...textStyleProps, ...textNoStyleProps });

const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  ...defaultProps
});
/****以上是获取默认属性****/

const emits = defineEmits<{
  (e: 'update'): void;
}>();

function handleClick(event: Event): void {
  event.stopPropagation(); // 阻止事件冒泡
}

function handleInput(event: Event): void {
  event.stopPropagation(); // 阻止事件冒泡
}

const eventHandlers: { [key: string]: (event: Event) => void } = {
  click: handleClick,
  input: handleInput,
}
</script>

<style lang="scss" scoped>
.Text {
  >textarea {
    @include fullInParent();
  }
}
</style>

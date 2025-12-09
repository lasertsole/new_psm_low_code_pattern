<template>
  <div class="editor">
    <div class="adds">
        <div class="title">{{ '组件添加' }}</div>
        <div class="list">
            <template v-for="item in componentAdds" :key="item.componentName">
                <div @click.stop="addComponent(item)" class="component">{{ item.showName }}</div>
            </template>
        </div>
    </div>

    <div class="contentCanvas">
        <div class="title">{{ '画布' }}</div>
        <div class="list">
            <TransitionGroup name="fade">
                <template v-for="item in componentCanvas" :key="item.id">
                    <CanvasWrapper>
                        <component 
                            :is="item.instance"
                            v-bind="transformToComponentProps(item?.props)"
                        ></component>
                    </CanvasWrapper>
                </template>
            </TransitionGroup>
        </div>
    </div>

    <div class="configs">
        <div class="title">{{ '属性栏' }}</div>
        <div class="list">
            <TransitionGroup name="fade">
                <template v-for="component in componentConfigs" :key="component">
                    <component :is="component"></component>
                </template>
            </TransitionGroup>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import { onErrorCaptured } from 'vue';

import { type ComponentProps, type Component, UPDATE_COMPONENT_ENUM } from "@/types"

function addComponent(component: Component):void {
    const id = uuidv4(); // 生成版本 4 的 UUID

    componentCanvas.push({
        id,
        ...component
    });
}

function update(targetId: string, updateType: UPDATE_COMPONENT_ENUM, params?: ComponentProps): void {

}


/****************以下是捕获子组件树中的异常****************/
onErrorCaptured((err: unknown, instance: ComponentPublicInstance | null) => {

  // 停止错误继续向上传播
  return false;
});
/****************以上是捕获子组件树中的异常****************/
</script>

<style lang="scss" scoped>
.editor {
    @include fullInParent();
    display: flex;
    justify-content: space-between;
    align-items: center;

    >* {
        height: 100%;
        background-color: white;

        >.title{
            display: grid;
            grid-column: 1 / -1;
            height: fit-content;
            justify-content: center;
            align-items: center;
            height: 50px;
        }
    }

    >.adds {
        @include fixedWidth(25%);
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        grid-auto-rows: max-content;

        >.title{
            background-color: #ffa0a0;
        }

        >.list{
            display: grid;
            grid-column: 1/-1;
            grid-template-columns: subgrid;

            >.component{
                width: auto;
                aspect-ratio: 1 / 1;
                @include flexCenter;
                border: 1px solid var(--theme-color);
                color: var(--theme-color);
                border-radius: 1rem;
                cursor: pointer;
            }
        }
    }

    >.contentCanvas {
        flex-grow: 2;

        >.list{
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;

            >.fade-enter-active,
            >.fade-leave-active {
                will-change: opacity;
                transition-property: opacity;
                transition-duration: 0.3s;
                transition-timing-function: ease;
            }

            >.fade-enter-from,
            >.fade-leave-to {
                opacity: 0;
            }

            >.fade-enter-to,
            >.fade-leave-from {
                opacity: 1;
                height: auto;
            }
        }
    }

    >.configs {
        @include fixedWidth(25%);
        display: flex;
        border-radius: 1rem;
        flex-direction: column;
    }
}
</style>

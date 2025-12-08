import type { ComponentProps } from "@/types/index.ts";

//属性由两部分组成 样式属性 和 其他属性
// 文本组件 的 样式props
export const rangeStyleProps:ComponentProps = {
    ...commonStyleProps,
}

// 文本组件 的 非样式属性
export const rangeNoStyleProps:ComponentProps = {
    min: 0,
    max: 10,
    step: 1,
}
import type { ComponentProps } from "@/types/index.ts";

//属性由两部分组成 样式属性 和 其他属性
// 文本组件 的 样式props
export const textStyleProps:ComponentProps = {
    ...commonStyleProps,
    // text
    textAlign: 'left',
    color: '#000',
    textDecoration: 'none',
    fontFamily: 'initial',
    fontSize: 'initial',
    fontWeight: 'initial',
    lineHeight: 'initial',
    letterSpacing: 'initial',
    textIndent: 'initial',
    textOverflow: 'initial',
}

// 文本组件 的 非样式属性
export const textNoStyleProps:ComponentProps = {
    text: '正文内容',
}
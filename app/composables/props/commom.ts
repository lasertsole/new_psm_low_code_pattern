import type { ComponentProps } from "@/types/index.ts";

// 通用样式props
export const commonStyleProps:ComponentProps = {
    // size
   height: 'auto',
   width: 'auto',
   maxHeight: 'auto',
   maxWidth: 'auto',
   minHeight: 'auto',
   minWidth: 'auto',
    
   // position
   position: 'static',
   top: '0px',
   right: '0px',
   bottom: '0px',
   left: '0px',
    
   // border
   border: '0',
   borderRadius: '0',
   borderTop: 'initial',
   borderRight: 'initial',
   borderBottom: 'initial',
   borderLeft: 'initial',
   borderColor: 'initial',
   borderWidth: 'initial',
    
   // shadow and opacity
   boxShadow: 'initial',
   opacity: 'initial',
    
   // geometric
   backgroundColor: 'initial',
    overflow: 'visible',
}

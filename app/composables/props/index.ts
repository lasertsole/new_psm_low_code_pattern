import { type Reactive, type AsyncComponentLoader } from 'vue';
import { mapValues, isNil } from "lodash-es";
import type { ComponentProps, Component } from "@/types/index.ts";
import { v4 as uuidv4 } from 'uuid';

// 组件名字映射
const componentNameToShowNameMap:Map<string, string> = new Map([
    ["text","文本"]
]);

// 组件响应式数组,key为id，值为当前画布上的组件属性 map


// 组件列表
export const componentAdds: Reactive<Component[]> = shallowReactive([]);
export const componentCanvas: Reactive<Component[]> = shallowReactive([]);
export const componentConfigs: Reactive<Component[]> = shallowReactive([]);

//获取添加组件的vue
const componentCanvasFiles = import.meta.glob('/components/canvas/**/*.vue');
Object.entries(componentCanvasFiles).map(([path, component])=>{
    const componentName = path.replace(/.*\/|\.vue$/g, '');
    const asynComponents = defineAsyncComponent({
        loader:component as AsyncComponentLoader<any>
    });


    const showName:string = componentNameToShowNameMap.get(componentName)?? '';
    componentAdds.push({
        componentName,
        showName,
        instance:asynComponents
    });
});


//获取配置组件的vue
const componentConfigsFiles = import.meta.glob('/components/conf/**/*.vue');
Object.entries(componentConfigsFiles).map(([path, component])=>{
    const asynComponents = defineAsyncComponent({
        loader:component as AsyncComponentLoader<any>
    });
    
    componentConfigs.push(asynComponents);
});

// 将默认值props 转换成组件的 props
export const transformToComponentProps = (props:ComponentProps | null | undefined): {
    readonly [key: string]: any;
} => {
    if(isNil(props)){
        return {}
    }
    
    return mapValues(props, (item)=>{
        if(!isNil(item)){
            if(typeof item === 'object' && 'default' in item && !isNil(item.default)){
                item = item.default
            }

            return {
                type: item.constructor,
                default: item
            }
        } else{
            return null;
        }

    })
}

// 正则表达式 /([A-Z])/g 匹配所有大写字母（全局匹配）
// 替换函数中的 $1 代表捕获到的大写字母本身
function convertCamelToKebab(camelCaseString:string):string {
  return camelCaseString.replace(/([A-Z])/g, (match, letter) => {
    return '-' + letter.toLowerCase();
  });
}

function addCurentComponent(component:Component):void{
    const id:string = uuidv4();
}
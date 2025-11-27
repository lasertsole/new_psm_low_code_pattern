export interface ComponentProps{
    [key: string]: string | number | boolean | null | undefined | ComponentProps;
}

export enum UPDATE_COMPONENT_ENUM {
  /** 新增 */
  ADD = 1,
  /** 删除 */
  DEL = 2,
  /** 修改 */
  MOD = 4,
  /** 选中 */
  SEL = 8
}

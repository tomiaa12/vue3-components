// 整合导出
import { withInstall } from "@/utils"

import switchDark from "./src/switchDark.vue"

export const KSwitchDark = withInstall(switchDark)
export default KSwitchDark

export * from "./src/switchDark"

// 定义组件的 ts 类型，在全局引入时可以有 ts 类型提示。
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    KSwitchDark: typeof KSwitchDark
  }
}

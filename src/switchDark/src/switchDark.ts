import { ExtractPropTypes } from "vue"
export const switchDarkProps = {
  modelValue: Boolean,
} as const

export type SwitchDarkProps = ExtractPropTypes<typeof switchDarkProps>

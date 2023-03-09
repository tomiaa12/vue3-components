<template>
  <button
    :class="{
      'k-switch': true,
      'is-dark': isDark,
    }"
    type="button"
    role="switch"
    v-bind="$attrs"
    @click="isDark = !isDark"
  >
    <span class="check">
      <dark v-if="isDark" />
      <light v-else />
    </span>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import dark from "./icon/dark.vue"
import light from "./icon/light.vue"
import { switchDarkProps } from "./switchDark"

defineOptions({
  name: "KSwitchDark",
})

const props = defineProps(switchDarkProps)
const emits = defineEmits(["update:modelValue"])
const key = "k-theme-appearance"

const isDark = ref(props.modelValue)
onMounted(() => {
  const query = window.matchMedia("(prefers-color-scheme: dark)")
  const appearance = localStorage.getItem(key)
  if (appearance !== null) {
    isDark.value = JSON.parse(appearance)
  } else {
    isDark.value =
      query.matches || document.documentElement.classList.contains("dark")
  }
  query.onchange = e => (isDark.value = e.matches)
  toogle()
})

const toogle = () => {
  document.documentElement.classList[isDark.value ? "add" : "remove"]("dark")
  emits("update:modelValue", isDark.value)
  localStorage.setItem(key, isDark.value.toString())
}
watch(isDark, toogle)

watch(
  () => props.modelValue,
  () => (isDark.value = props.modelValue)
)
</script>

<style lang="scss" scoped>
.k-switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid rgba(60, 60, 67, 0.29);
  background-color: #f6f6f7;
  transition: border-color 0.25s;
  &:hover {
    border-color: #8e8e93;
  }
  .check {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: transform 0.25s;
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(svg) {
      width: 12px;
      height: 12px;
      fill: rgba(60, 60, 67, 0.7);
    }
  }
  &.is-dark {
    border-color: rgba(82, 82, 89, 0.68);
    background-color: #2c2c2c;
    :deep(svg) {
      color: rgba(255, 255, 245, 0.86);
      transition: opacity 0.25s;
    }
    .check {
      transform: translate(18px);
      background-color: black;
    }
  }
}
</style>

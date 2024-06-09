<template>
  <span
    class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
    :class="color"
  >
    {{ text }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const CommonBadge = defineComponent({
  name: 'CommonBadge',
  props: {
    severity: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const severityMap = {
      info: 'bg-blue-50 text-blue-700 ring-blue-600/10',
      success: 'bg-green-50 text-green-700 ring-green-600/10',
      warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/10',
      error: 'bg-red-50 text-red-700 ring-red-600/10',
      gray: 'bg-gray-50 text-gray-700 ring-gray-600/10'
    } as Record<string, string>

    return {
      color: severityMap[props.severity]
    }
  }
})

export default CommonBadge
</script>

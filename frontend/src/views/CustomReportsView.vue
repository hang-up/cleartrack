<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Custom reports</h1>
        <p class="mt-2 text-sm text-gray-700">
          Create a new report for your projects and export them in CSV.
        </p>
      </div>
    </div>
    <div class="mt-8 flow-root" v-if="projects.length">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <CustomReportsTable :projects="projects" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useProjects } from '@/composables/use-projects'
import CustomReportsTable from '@/components/reports/Table.vue'

export default defineComponent({
  name: 'CustomReportsView',
  components: {
    CustomReportsTable
  },
  setup() {
    // TODO: Type continuity between backend and frontend
    const projects = ref<any>([])
    const { getProjects } = useProjects()

    onMounted(async () => {
      projects.value = await getProjects()
    })

    return {
      projects
    }
  }
})
</script>

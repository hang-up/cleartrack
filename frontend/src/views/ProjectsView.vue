<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Projects</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all projects, past, present and future.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          @click="router.push({ name: 'new-project' })"
          type="button"
          class="block rounded-md bg-slate-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          Create new project
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle sm:px-6 lg:px-8">
          <TabView class="tabview">
            <TabPanel header="Gantt Chart">
              <ProjectsGantt />
            </TabPanel>
            <TabPanel header="List View">
              <ProjectsList />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ProjectsList from '@/components/projects/List.vue'
import ProjectsGantt from '@/components/projects/Gantt.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ProjectsView',
  components: {
    TabView,
    TabPanel,
    ProjectsList,
    ProjectsGantt
  },
  setup() {
    const router = useRouter()

    return {
      router
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.tabview [data-p-active='true'] a) {
  border-bottom: 2px solid #3b82f6;
}
</style>

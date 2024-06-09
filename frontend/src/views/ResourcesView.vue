<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Resources</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all available resources. A resource is defined by xxxx
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          @click="isResourceModalVisible = true"
          type="button"
          class="block rounded-md bg-slate-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          Create new resource
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <ResourcesList />
        </div>
      </div>
    </div>
    <ResourceModal
      :visible="isResourceModalVisible"
      @close="(e: boolean) => (isResourceModalVisible = e)"
    ></ResourceModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ResourcesList from '@/components/resources/List.vue'
import ResourceModal from '@/components/resources/Modal.vue'

export default defineComponent({
  name: 'ProjectsView',
  components: {
    ResourcesList,
    ResourceModal
  },
  setup() {
    const isResourceModalVisible = ref(false)

    return {
      isResourceModalVisible
    }
  }
})
</script>

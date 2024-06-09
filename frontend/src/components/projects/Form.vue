<template>
  <div>
    <div class="border-b pb-6">
    <div>
      <nav class="sm:hidden" aria-label="Back">
        <a href="#" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Back
        </a>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li>
            <div class="flex">
              <router-link class="text-sm font-medium text-gray-500 hover:text-gray-700" :to="{name: 'projects-list'}">Projects</router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <p class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">New project</p>
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Create a project</h2>
    </div>
  </div>
  <form class="mt-8">
    <div class="space-y-12">
      <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">General description</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Collect overview information about a new project.</p>
        </div>

        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="col-span-full">
            <label class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <InputText v-model="name" class="w-full"/>
            </div>
          </div>

          <div class="col-span-full">
            <label class="block text-sm font-medium leading-6 text-gray-900">Description</label>
            <div class="mt-2">
              <Textarea v-model="description" class="w-full" rows="5"/>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Project Status</label>
            <div class="mt-2">
              <Dropdown v-model="selectedProjectStatus" :options="projectStatuses" optionLabel="code" placeholder="Select a Status" class="md:w-full">
                <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    <CommonBadge :severity="getProjectStatusBadge(slotProps.value.label)" :text="slotProps.value.label" />
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <CommonBadge :severity="getProjectStatusBadge(slotProps.option.label)" :text="slotProps.option.label" />
                </div>
            </template>
              </Dropdown>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Project Type</label>
            <div class="mt-2">
              <Dropdown v-model="selectedProjectType" :options="projectTypes" optionLabel="id" placeholder="Select a Type" class="md:w-full">
                <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    {{  slotProps.value.name }}
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    {{ slotProps.option.name }}
                </div>
            </template>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      

      <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Project dates</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Information about key milestones.</p>
        </div>

        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
            <div class="mt-2">
              <Calendar v-model="startDate" showIcon iconDisplay="input" class="w-full" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">End Date</label>
            <div class="mt-2">
              <Calendar v-model="endDate" showIcon iconDisplay="input" class="w-full" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Committee Presentation Date</label>
            <div class="mt-2">
              <Calendar v-model="committeePresentationDate" showIcon iconDisplay="input" class="w-full" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Publication Date</label>
            <div class="mt-2">
              <Calendar v-model="publicationDate" showIcon iconDisplay="input" class="w-full" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Project resources</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Add ressources to your project</p>
        </div>

        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-6">
            <label class="block text-sm font-medium leading-6 text-gray-900">Project resources</label>
            <div class="mt-2">
              <div class="flex justify-between">
                <MultiSelect class="w-10/12" v-model="selectedResources" :options="availableResources" filter optionLabel="name" display="chip" placeholder="Select Resources"
               />
               <button type="button" class="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600" @click="createResource">Create new</button>
              </div>
            </div>
          </div>


        </div>
      </div>

    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
  </form>
  <ResourceModal :visible="isResourceModalVisible" @close="(e:boolean) => isResourceModalVisible = e"></ResourceModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { PhotoIcon, UserCircleIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid'
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import CommonBadge from "@/components/common/Badge.vue"
import ResourceModal from "@/components/resources/Modal.vue"

import { ProjectStatus } from '@/types/project-status';
import {useProjects} from '@/composables/use-projects'
import { useResources } from '@/composables/use-resources';


export default defineComponent({
  name: 'NewProjectForm',
  components: {
    CommonBadge,
    PhotoIcon,
    UserCircleIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    InputText,
    MultiSelect,
    Textarea,
    Calendar,
    Dropdown,
    ResourceModal
  },
  setup() {
    const {getProjectStatusBadge, getProjectTypes} = useProjects()
    const {getAll} = useResources()

    const name = ref('')
    const description = ref('')
    const startDate = ref('')
    const endDate = ref('')
    const committeePresentationDate = ref('')
    const publicationDate = ref('')
    
    const projectTypes = ref<any[]>([])
    const selectedProjectType = ref(undefined)
    
    const projectStatuses = computed(() => Object.entries(ProjectStatus).map(([key, value]) => ({label: value, value: key})))
    const selectedProjectStatus = ref(undefined)

    const selectedResources = ref<any[]>([])
    const availableResources = ref<any[]>([])

    const isResourceModalVisible = ref(false)
    const createResource = () => {
      isResourceModalVisible.value = true
    }
    onMounted( async () => {
      projectTypes.value = await getProjectTypes();
      availableResources.value = await getAll();
    })

    return {
      name,
      description,
      startDate,
      endDate,
      committeePresentationDate,
      publicationDate,
      projectStatuses,
      selectedProjectStatus,
      getProjectStatusBadge,
      selectedProjectType,
      projectTypes,
      selectedResources,
      availableResources,
      createResource,
      isResourceModalVisible,
    }
  }
})
</script>


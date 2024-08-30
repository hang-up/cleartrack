<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead>
      <tr>
        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
          Name
        </th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Created At
        </th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Last Updated
        </th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Status
        </th>
        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200" v-if="resources.length">
      <tr v-for="resource in resources" :key="resource.id">
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {{ resource.name }}
        </td>
        <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
          {{ resource.role.split(' ').slice(0, 100).join(' ') }}...
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ format(resource.created_at, 'MMMM d, yyyy, h:mm a') }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {{ resource.updated ? format(resource.updated_at, 'MMMM d, yyyy, h:mm a') : 'N/A' }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <Tag :value="getTagConfig(resource.status).label" :severity="getTagConfig(resource.status).severity" />
        </td>

        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <a href="#" class="text-slate-600 hover:text-slate-900">Edit<span class="sr-only">, {{ resource.name
              }}</span></a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Tag from 'primevue/tag'
import { format } from 'date-fns'
import { useResources } from '@/composables/use-resources'

const List = defineComponent({
  name: 'ResourcesList',
  components: {
    Tag
  },
  setup() {
    const resources = ref<any>([])
    const { getAll } = useResources()

    onMounted(async () => {
      resources.value = await getAll()
    })

    // Function that returns the class & the label for the tag
    const getTagConfig = (status: string) => {
      switch (status) {
        case 'true':
          return { severity: 'success', label: 'Active' }
        case 'false':
          return { severity: 'danger', label: 'Inactive' }
        default:
          return { severity: 'warning', label: 'Unknown' }
      }
    }

    return {
      resources,
      getTagConfig,
      format
    }
  }
})

export default List
</script>

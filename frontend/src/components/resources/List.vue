<template>
  <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created At</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Updated</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="resource in resources" :key="resource.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ resource.name }}</td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {{ resource.description.split(' ').slice(0, 50).join(' ') }}...
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ resource.created_at }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ resource.updated_at }}</td>
                  
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" class="text-slate-600 hover:text-slate-900"
                      >Edit<span class="sr-only">, {{ resource.name }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import CommonBadge from "@/components/common/Badge.vue"
  
  const List = defineComponent({
    name: "ProjectsList",
    components: {
      CommonBadge
    },
    setup() {
      const resources = [
        {
          id: 1,
          name: 'Resource 1',
          description: 'This is a description of Resource 1',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
        {
          id: 2,
          name: 'Resource 2',
          description: 'This is a description of Resource 2',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
        {
          id: 3,
          name: 'Resource 3',
          description: 'This is a description of Resource 3',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
        {
          id: 4,
          name: 'Resource 4',
          description: 'This is a description of Resource 4',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
        {
          id: 5,
          name: 'Resource 5',
          description: 'This is a description of Resource 5',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
        {
          id: 6,
          name: 'Resource 6',
          description: 'This is a description of Resource 6',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
        {
          id: 7,
          name: 'Resource 7',
          description: 'This is a description of Resource 7',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
        {
          id: 8,
          name: 'Resource 8',
          description: 'This is a description of Resource 8',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
        {
          id: 9,
          name: 'Resource 9',
          description: 'This is a description of Resource 9',
          created_at: '2021-01-01',
          updated_at: '2021-12-31'
        },
      ]
  
      return {
        resources
      };
    }
  })
  
  export default List
  
  </script>
  
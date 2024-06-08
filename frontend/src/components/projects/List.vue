<template>
<table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Committee Presentation Date</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Publication Date</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="project in projects" :key="project.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ project.name }}</td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  {{ project.description.split(' ').slice(0, 20).join(' ') }}...
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ project.start_date }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ project.end_date }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ project.committee_presentation_date }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ project.publication_date }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><CommonBadge severity="gray" :text="project.type"/></td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><CommonBadge :severity="getProjectStatusBadge(project.status)" :text="project.status" /></td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <a href="#" class="text-slate-600 hover:text-slate-900"
                    >Edit<span class="sr-only">, {{ project.name }}</span></a
                  >
                </td>
              </tr>
            </tbody>
          </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommonBadge from "@/components/common/Badge.vue"
import { ProjectStatus } from '@/types/project-status';
import {useProjects} from '@/composables/use-projects'

const List = defineComponent({
  name: "ProjectsList",
  components: {
    CommonBadge
  },
  setup() {
    const projects = [
      {
        id: 1,
        name: 'Project 1',
        description: 'This is a description of project 1',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.active
      },
      {
        id: 2,
        name: 'Project 2',
        description: 'This is a description of project 2',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.completed
      },
      {
        id: 3,
        name: 'Project 3',
        description: 'This is a description of project 3',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.planned
      },
      {
        id: 4,
        name: 'Project 4',
        description: 'This is a description of project 4',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.pending_approval
      },
      {
        id: 5,
        name: 'Project 5',
        description: 'This is a description of project 5',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.cancelled
      },
      {
        id: 6,
        name: 'Project 6',
        description: 'This is a description of project 6',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.in_review
      },
      {
        id: 7,
        name: 'Project 7',
        description: 'This is a description of project 7',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.on_hold
      },
      {
        id: 8,
        name: 'Project 8',
        description: 'This is a description of project 8',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.delayed
      },
      {
        id: 9,
        name: 'Project 9',
        description: 'This is a description of project 9',
        start_date: '2021-01-01',
        end_date: '2021-12-31',
        committee_presentation_date: '2021-12-01',
        publication_date: '2021-12-15',
        type: 'Research',
        status: ProjectStatus.not_started
      },
    ]
    const {getProjectStatusBadge} = useProjects()

    return {
      getProjectStatusBadge,
      projects
    };
  }
})

export default List

</script>

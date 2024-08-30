<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div class="flex h-8 my-8 shrink-0 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 54 41"
        >
          <path fill="#2A2E4E" d="M54 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
          <path
            fill="#2A2E4E"
            fill-rule="evenodd"
            d="M13.75 40.794C6.156 40.794 0 34.638 0 27.044V1h5v26.044a8.75 8.75 0 0 0 8.75 8.75c4.893 0 8.75-3.771 8.75-8.544h5v7.5a1.25 1.25 0 0 0 2.5 0v-8.875a6.25 6.25 0 0 1-7.5-6.125V7.25a6.25 6.25 0 1 1 12.5 0v27.5a1.25 1.25 0 1 0 2.5 0V7.25a6.25 6.25 0 1 1 12.5 0v27.5a6.25 6.25 0 0 1-10 5A6.222 6.222 0 0 1 36.25 41a6.222 6.222 0 0 1-3.75-1.25 6.251 6.251 0 0 1-9.466-2.47c-2.456 2.197-5.723 3.514-9.284 3.514Zm30-4.794c-.69 0-1.25-.56-1.25-1.25V7.25a1.25 1.25 0 1 1 2.5 0v27.5c0 .69-.56 1.25-1.25 1.25ZM30 19.75a1.25 1.25 0 0 1-2.5 0V7.25a1.25 1.25 0 1 1 2.5 0v12.5Z"
            clip-rule="evenodd"
          ></path>
          <path
            fill="#2A2E4E"
            fill-rule="evenodd"
            d="M7.5 27.25a6.25 6.25 0 1 0 12.5 0v-20a6.25 6.25 0 1 0-12.5 0v20Zm6.25 1.25c-.69 0-1.25-.56-1.25-1.25v-20a1.25 1.25 0 1 1 2.5 0v20c0 .69-.56 1.25-1.25 1.25Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="(menu, key) in menus" :key="key">
                <router-link
                  :to="menu.link"
                  class="text-gray-700 hover:text-slate-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                >
                  <component
                    :is="menu.icon"
                    class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  ></component>
                  {{ menu.title }}
                </router-link>
              </li>
            </ul>
          </li>
          <li class="-mx-6 mt-auto">
            <a
              href="#"
              class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              <img
                class="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span class="sr-only">Your profile</span>
              <span aria-hidden="true">Rob Hang</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  FolderPlusIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftEllipsisIcon,
  UserGroupIcon,
  DocumentChartBarIcon
} from '@heroicons/vue/24/solid'

const Sidebar = defineComponent({
  name: 'TheSidebar',
  setup() {
    const menus = ref({
      dashboard: {
        title: 'Projects',
        icon: FolderPlusIcon,
        link: '/projects'
      },
      team: {
        title: 'Resources',
        icon: WrenchScrewdriverIcon,
        link: '/resources'
      },
      projects: {
        title: 'Recommendations',
        icon: ChatBubbleLeftEllipsisIcon,
        link: '/recommendations'
      },
      calendar: {
        title: 'Stakeholders',
        icon: UserGroupIcon,
        link: '/stakeholders'
      },
      externalApi: {
        title: 'Custom Reports',
        icon: DocumentChartBarIcon,
        link: '/reports'
      }
    })
    return {
      menus
    }
  }
})

export default Sidebar
</script>

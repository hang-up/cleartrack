<template>
  <main class="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
    <div class="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
      <h1 class="mt-4 text-2xl tracking-tight text-gray-900 sm:text-5xl">Welcome back!</h1>
      <p class="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
        Here are some actions to get you started
      </p>
    </div>
    <div class="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
      <ul role="list" class="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5">
        <li v-for="(link, linkIdx) in links" :key="linkIdx" class="relative flex gap-x-6 py-6">
          <div
            class="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10"
          >
            <component :is="link.icon" class="h-6 w-6 text-indigo-600" aria-hidden="true" />
          </div>
          <div class="flex-auto">
            <h3 class="text-sm font-semibold leading-6 text-gray-900">
              <a :href="link.href">
                <span class="absolute inset-0" aria-hidden="true" />
                {{ link.name }}
              </a>
            </h3>
            <p class="mt-2 text-sm leading-6 text-gray-600">{{ link.description }}</p>
          </div>
          <div class="flex-none self-center">
            <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { BookmarkSquareIcon, FolderPlusIcon, WrenchScrewdriverIcon } from '@heroicons/vue/24/solid'

const links = [
  {
    name: 'New project',
    href: '/#/projects/new',
    description: 'Create a new project and start tracking your progress.',
    icon: FolderPlusIcon
  },
  {
    name: 'Resources',
    href: '/#/resources',
    description: 'Create & manage resources for your projects.',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'Export your data',
    href: '/#/data/export',
    description: 'Export your data to CSV or Excel format.',
    icon: BookmarkSquareIcon
  }
]
</script>

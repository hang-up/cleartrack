<template>
  <div class="">
    <div class="flex mb-2 justify-end">
      <SelectButton v-model="mode" :options="modes" aria-labelledby="basic" />
    </div>

    <div class="overflow-hidden">
      <frappe-gantt
        :view-mode="mode"
        :tasks="tasks"
        @task-updated="debugEventLog.push($event)"
        @task-date-updated="debugEventLog.push($event)"
        @task-progress-updated="debugEventLog.push($event)"
        v-if="tasks.length"
      />
      <i class="pi pi-spinner animate-spin !block text-center my-0 mx-auto" v-else></i>
    </div>

    <button @click="addRandomTask">Add</button>
    <ul>
      <li v-for="event in debugEventLog" :key="event.id">
        {{ event }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import SelectButton from 'primevue/selectbutton'

import FrappeGantt from '@/components/common/Gantt.vue'

const BetterGantt = defineComponent({
  name: 'BetterGantt',
  components: {
    FrappeGantt,
    SelectButton
  },
  setup() {
    const mode = ref('week')
    const modes = ref(['day', 'week', 'month', 'quarter', 'year', 'fiscal_year'])
    const tasks = ref<any>([])
    const debugEventLog = ref<any>([])

    const fetchTasks = async () => {
      Promise.resolve().then(() => {
        setTimeout(() => {
          tasks.value = [
            {
              id: '1',
              name: 'Hello',
              start: '2019-01-01',
              end: '2019-01-05',
              progress: 10
            },
            {
              id: '2',
              name: 'World',
              start: '2019-01-05',
              end: '2019-03-10',
              progress: 20,
              dependencies: '1'
            },
            {
              id: '3',
              name: 'From',
              start: '2019-01-10',
              end: '2019-04-15',
              progress: 30,
              dependencies: '2'
            },
            {
              id: '4',
              name: 'Lloyd',
              start: '2019-01-15',
              end: '2019-02-28',
              progress: 40,
              dependencies: '3'
            }
          ]
        }, 1000)
      })
    }

    const addRandomTask = () => {
      const id = Math.random().toString(36).substring(7)
      tasks.value = [
        ...tasks.value,
        {
          id: id,
          name: id,
          start: '2019-01-01',
          end: '2019-01-05',
          progress: Math.random() * 100
        }
      ]
    }

    onMounted(async () => {
      await fetchTasks()
    })

    return {
      mode,
      modes,
      tasks,
      debugEventLog,
      addRandomTask
    }
  }
})

export default BetterGantt

// export default {
//   name: 'App',
//   components: {
//     FrappeGantt
//   },
//   data() {
//     return {
//       mode: 'week',
//       tasks: [],
//       debugEventLog: []
//     }
//   },
//   mounted() {
//     this.tasks.push(
//       {
//         id: '1',
//         name: 'Hello',
//         start: '2019-01-01',
//         end: '2019-01-05',
//         progress: 10
//       },
//       {
//         id: '2',
//         name: 'World',
//         start: '2019-01-05',
//         end: '2019-01-10',
//         progress: 20,
//         dependencies: '1'
//       },
//       {
//         id: '3',
//         name: 'From',
//         start: '2019-01-10',
//         end: '2019-01-15',
//         progress: 30,
//         dependencies: '2'
//       },
//       {
//         id: '4',
//         name: 'Lloyd',
//         start: '2019-01-15',
//         end: '2019-01-20',
//         progress: 40,
//         dependencies: '3'
//       }
//     )
//   },
//   methods: {
//     addRandomTask() {
//       const id = Math.random().toString(36).substring(7)
//       this.tasks.push({
//         id: id,
//         name: id,
//         start: '2019-01-01',
//         end: '2019-01-05',
//         progress: Math.random() * 100
//       })
//       console.log(this.tasks)
//     },
//     demoViewMode(viewMode) {
//       this.mode = viewMode
//     }
//   }
// }
</script>

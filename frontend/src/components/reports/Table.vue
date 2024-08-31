<template>
  <div>
    <DataTable :value="refProjects" ref="dt" resizableColumns removableSort :reorderableColumns="true" stripedRows
      columnResizeMode="expand" showGridlines tableStyle="min-width: 50rem" scrollable
      :exportFunction="beforeExportFunction">
      <template #header>
        <Toolbar>
          <template #start>
            <PButton v-tooltip="'Print'" icon="pi pi-print" class="mr-2" severity="secondary" @click="print" />
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText placeholder="Search" />
            </IconField>
            <PButton class="" icon="pi pi-external-link" label="Export to CSV" @click="handleExport" />
          </template>

          <template #center> </template>

          <template #end> </template>
        </Toolbar>
      </template>

      <Column v-for="column in columns" :key="column.field" :field="column.field" :header="column.header" sortable
        :exportHeader="column.header" :exportable="true" :style="column.style">
        <template #body="slotProps">
          <template v-if="column.field === 'created_at'">
            {{ format(slotProps.data.created_at, 'MMMM d, yyyy, h:mm a') }}
          </template>
          <template v-else-if="column.field === 'updated_at'">
            {{
              slotProps.data.updated_at
                ? format(slotProps.data.updated_at, 'MMMM d, yyyy, h:mm a')
                : 'N/A'
            }}
          </template>
          <template v-else-if="column.field === 'start_date'">
            {{ format(slotProps.data.start_date, 'MMMM d, yyyy, h:mm a') }}
          </template>
          <template v-else-if="column.field === 'end_date'">
            {{ format(slotProps.data.end_date, 'MMMM d, yyyy, h:mm a') }}
          </template>
          <template v-else-if="column.field === 'committee_presentation_date'">
            {{ format(slotProps.data.committee_presentation_date, 'MMMM d, yyyy, h:mm a') }}
            <Tag :value="getDaysDifference(slotProps.data.committee_presentation_date).label"
              :severity="getDaysDifference(slotProps.data.committee_presentation_date).severity" class="mt-4" />
          </template>
          <template v-else-if="column.field === 'publication_date'">
            {{ format(slotProps.data.publication_date, 'MMMM d, yyyy, h:mm a') }}
            <Tag :value="getDaysDifference(slotProps.data.publication_date).label"
              :severity="getDaysDifference(slotProps.data.publication_date).severity" class="mt-4" />
          </template>
          <template v-else-if="column.field === 'status'">
            <CommonBadge :text="getProjectStatusLabel(slotProps.data.status)"
              :severity="getProjectStatusBadge(slotProps.data.status)" />
          </template>
          <template v-else-if="column.field === 'project_resource'">
            <Tag v-for="resource in slotProps.data.project_resource" :key="resource.resources.id"
              :value="resource.resources.name" severity="info" v-tooltip="`${resource.resources.role}
            Is Active?: ${resource.resources.status}
            Created At: ${format(resource.resources.created_at, 'MMMM d, yyyy, h:mm a')}`
                " class="m-1 cursor-default"></Tag>
          </template>
          <template v-else-if="column.field === 'project_stakeholder'">
            <Tag v-for="stakeholder in slotProps.data.project_stakeholder" :key="stakeholder.stakeholders.id"
              :value="stakeholder.stakeholders.name" severity="info" v-tooltip="`${stakeholder.stakeholders.name}
            Type: ${stakeholder.stakeholders.stakeholder_type}
            Created At: ${format(stakeholder.stakeholders.created_at, 'MMMM d, yyyy, h:mm a')}`
                " class="m-1 cursor-default"></Tag>
          </template>
          <template v-else-if="column.field === 'project_types'">
            <CommonBadge severity="gray" :text="slotProps.data.project_types.name"></CommonBadge>
          </template>
          <template v-else-if="column.field === 'recommendations'">
            <RecommendationsPanel :recommendations="slotProps.data.recommendations" />
          </template>
          <template v-else>
            {{ slotProps.data[column.field] }}
          </template>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import PButton from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Tag from 'primevue/tag'
import { format, differenceInDays } from 'date-fns'
import { useProjects } from '@/composables/use-projects'
import CommonBadge from '@/components/common/Badge.vue'
import RecommendationsPanel from './RecommendationsPanel.vue'

const Table = defineComponent({
  name: 'CustomReportsTable',
  components: {
    CommonBadge,
    DataTable,
    Column,
    PButton,
    Toolbar,
    InputText,
    IconField,
    InputIcon,
    Tag,
    RecommendationsPanel
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const { getProjectStatusBadge, getProjectStatusLabel } = useProjects()

    const dt = ref()
    const refProjects = ref(props.projects)
    const handleExport = () => {
      dt.value.exportCSV()
    }
    const beforeExportFunction = ({ data, field }: { data: any; field: string }) => {
      if (
        ['project_resource', 'project_stakeholder', 'project_types', 'recommendations'].includes(
          field
        )
      ) {
        return JSON.stringify(data)
      }
      return data
    }
    const print = () => {
      window.print()
    }
    const columns = computed(() => {
      return Object.keys(refProjects.value[0] as any).map((key) => {
        return {
          field: key,
          header: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, ' '),
          style: ['recommendations', 'description'].includes(key) ? 'min-width: 450px' : ''
        }
      })
    })
    const getDaysDifference = (date: Date) => {
      const diff = differenceInDays(new Date(), date)
      const res = {
        label: '',
        severity: ''
      }
      if (diff === 0) {
        res.label = 'Today'
        res.severity = 'warning'
      }
      if (diff > 0) {
        res.label = `${diff} days ago`
        res.severity = 'danger'
      }
      if (diff < 0) {
        res.label = `${Math.abs(diff)} days from now`
        res.severity = 'success'
      }
      return res
    }

    return {
      dt,
      beforeExportFunction,
      refProjects,
      columns,
      print,
      format,
      getDaysDifference,
      getProjectStatusBadge,
      getProjectStatusLabel,
      handleExport
    }
  }
})

export default Table
</script>

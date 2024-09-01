<template>
  <div>
    <DataTable
      :value="refProjects"
      ref="dt"
      resizableColumns
      removableSort
      :reorderableColumns="true"
      stripedRows
      columnResizeMode="expand"
      showGridlines
      tableStyle="min-width: 50rem"
      scrollable
      :exportFunction="beforeExportFunction"
      v-model:filters="filters"
      paginator
      filter-display="menu"
      :rows="10"
    >
      <template #empty> No projects found. </template>

      <template #header>
        <Toolbar>
          <template #start>
            <div class="flex flex-row items-end gap-2">
              <PButton
                v-tooltip="'Print'"
                icon="pi pi-print"
                class="mr-2"
                severity="secondary"
                @click="print"
              />
              <IconField iconPosition="left" class="mr-2">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Search" />
              </IconField>
              <div class="flex flex-col">
                <label for="ms-columns" style="font-size: 10px"> Additional Columns</label>
                <MultiSelect
                  id="ms-columns"
                  :modelValue="selectedColumns"
                  :options="columns"
                  optionLabel="header"
                  @update:modelValue="onSelectedColumnsToggle"
                  display="chip"
                  placeholder="Select Columns"
                  class="mr-2 max-w-lg"
                />
              </div>
              <PButton
                class=""
                icon="pi pi-external-link"
                label="Export to CSV"
                @click="handleExport"
              />
            </div>
          </template>

          <template #center> </template>

          <template #end> </template>
        </Toolbar>
      </template>
      <Column
        field="id"
        header="ID"
        :exportable="true"
        :style="{ 'min-width': '200px' }"
        sortable
      />
      <Column
        field="name"
        header="Name"
        :exportable="true"
        :style="{ 'min-width': '200px' }"
        sortable
      />
      <Column
        field="description"
        header="Description"
        :exportable="true"
        :style="{ 'min-width': '400px' }"
        sortable
      />

      <Column
        v-for="column in selectedColumns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        sortable
        :exportHeader="column.header"
        :exportable="true"
        :style="column.style"
        :showFilterMatchModes="!['status'].includes(column.field ?? '')"
        :filter-field="column.filterField"
        :data-type="column.dataType"
      >
        <!-- Content -->
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
            {{ format(slotProps.data.committee_presentation_date, 'MMMM d, yyyy, h:mm a') }} <br />
            <Tag
              :value="getDaysDifference(slotProps.data.committee_presentation_date).label"
              :severity="getDaysDifference(slotProps.data.committee_presentation_date).severity"
              class="mt-4"
            />
          </template>
          <template v-else-if="column.field === 'publication_date'">
            {{ format(slotProps.data.publication_date, 'MMMM d, yyyy, h:mm a') }} <br />
            <Tag
              :value="getDaysDifference(slotProps.data.publication_date).label"
              :severity="getDaysDifference(slotProps.data.publication_date).severity"
              class="mt-4"
            />
          </template>
          <template v-else-if="column.field === 'status'">
            <CommonBadge
              :text="getProjectStatusLabel(slotProps.data.status)"
              :severity="getProjectStatusBadge(slotProps.data.status)"
            />
          </template>
          <template v-else-if="column.field === 'project_resource'">
            <Tag
              v-for="resource in slotProps.data.project_resource"
              :key="resource.resources.id"
              :value="resource.resources.name"
              severity="info"
              v-tooltip="
                `${resource.resources.role}
            Is Active?: ${resource.resources.status}
            Created At: ${format(resource.resources.created_at, 'MMMM d, yyyy, h:mm a')}`
              "
              class="m-1 cursor-default"
            ></Tag>
          </template>
          <template v-else-if="column.field === 'project_stakeholder'">
            <Tag
              v-for="stakeholder in slotProps.data.project_stakeholder"
              :key="stakeholder.stakeholders.id"
              :value="stakeholder.stakeholders.name"
              severity="info"
              v-tooltip="
                `${stakeholder.stakeholders.name}
            Type: ${stakeholder.stakeholders.stakeholder_type}
            Created At: ${format(stakeholder.stakeholders.created_at, 'MMMM d, yyyy, h:mm a')}`
              "
              class="m-1 cursor-default"
            ></Tag>
          </template>
          <template v-else-if="column.field === 'project_types'">
            <CommonBadge severity="gray" :text="slotProps.data.project_types.name"></CommonBadge>
          </template>
          <template v-else-if="column.field === 'recommendations'">
            <RecommendationsPanel :recommendations="slotProps.data.recommendations" />
          </template>
          <template v-else>
            {{ column.field ? slotProps.data[column.field] : '' }}
          </template>
        </template>

        <!-- Filters -->
        <template
          #filter="{ filterModel, filterCallback }"
          v-if="
            ![
              'project_resource',
              'project_stakeholder',
              'project_types',
              'recommendations'
            ].includes(column.field ?? '')
          "
        >
          <template
            v-if="
              [
                'created_at',
                'updated_at',
                'start_date',
                'end_date',
                'committee_presentation_date',
                'publication_date'
              ].includes(column.field ?? '')
            "
          >
            <Calendar
              v-model="filterModel.value"
              dateFormat="mm/dd/yy"
              placeholder="mm/dd/yyyy"
              mask="99/99/9999"
            />
          </template>
          <template v-if="column.field === 'status'">
            <MultiSelect
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="Object.keys(statusLabelMap)"
              placeholder="Any"
              class="p-column-filter"
              style="max-width: 200px"
            >
              <template #option="slotProps">
                <CommonBadge
                  :text="getProjectStatusLabel(slotProps.option)"
                  :severity="getProjectStatusBadge(slotProps.option)"
                />
              </template>
            </MultiSelect>
          </template>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import PButton from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import MultiSelect from 'primevue/multiselect'
import Tag from 'primevue/tag'
import Calendar from 'primevue/calendar'
import { format, differenceInDays } from 'date-fns'
import { useProjects } from '@/composables/use-projects'
import CommonBadge from '@/components/common/Badge.vue'
import RecommendationsPanel from './RecommendationsPanel.vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import { statusLabelMap } from '@/types/project-status'
import { projectTypeLabelMap } from '@/types/project-types'
import { useDate } from '@/composables/use-date'

type ColumnType = {
  field?: string
  header?: string
  style?: string
  filterField?: string
  dataType?: string
}

const Table = defineComponent({
  name: 'CustomReportsTable',
  components: {
    CommonBadge,
    DataTable,
    Calendar,
    Column,
    PButton,
    Toolbar,
    InputText,
    IconField,
    InputIcon,
    Tag,
    MultiSelect,
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
    const { formatDate } = useDate()

    // Exports + Print
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

    // Columns
    const columns = ref<ColumnType[]>([])
    columns.value = Object.keys(refProjects.value[0] as any)
      .map((key) => {
        if (['id', 'name', 'description', 'project_type_id'].includes(key)) {
          return {}
        }
        return {
          field: key,
          header: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, ' '),
          style: ['recommendations'].includes(key) ? 'min-width: 450px' : 'min-width: 200px',
          filterField: [
            'created_at',
            'updated_at',
            'start_date',
            'end_date',
            'committee_presentation_date',
            'publication_date'
          ].includes(key)
            ? key
            : undefined,
          dataType: [
            'created_at',
            'updated_at',
            'start_date',
            'end_date',
            'committee_presentation_date',
            'publication_date'
          ].includes(key)
            ? 'date'
            : undefined
        }
      })
      .filter((col) => Object.keys(col).length)

    // Filters
    const selectedColumns = ref(columns.value)
    const onSelectedColumnsToggle = (val: any) => {
      selectedColumns.value = columns.value.filter((col) => val.includes(col))
    }
    const filters = ref({
      // The following fields are object and needs a custom filter to be applied.
      // TODO: Implement custom filters for these fields via FilterService.
      // project_resource: { value: null, matchMode: FilterMatchMode.IN },
      // project_stakeholder: { value: null, matchMode: FilterMatchMode.IN },
      // project_types: { value: null, matchMode: FilterMatchMode.IN },
      // project_status: { value: null, matchMode: FilterMatchMode.IN },
      status: { value: null, matchMode: FilterMatchMode.IN },
      created_at: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      },
      updated_at: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      },
      start_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      },
      end_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      },
      committee_presentation_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      },
      publication_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      }
    })

    // Misc.
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
      handleExport,
      selectedColumns,
      onSelectedColumnsToggle,
      statusLabelMap,
      projectTypeLabelMap,
      filters,
      formatDate
    }
  }
})

export default Table
</script>

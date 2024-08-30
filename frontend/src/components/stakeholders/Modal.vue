<template>
  <PDialog v-model:visible="isVisible" modal header="Create Stakeholder" :style="{ width: '25rem' }" :closable="false">
    <span class="text-surface-600 dark:text-surface-0/70 block mb-5 p-text-secondary text-sm">A stakeholder is an entity
      who has an interest in the success of a project.</span>
    <div class="flex items-center gap-3 mb-3">
      <label for="name" class="font-semibold w-[6rem]">Name</label>
      <InputText id="name" class="flex-auto" autocomplete="off" v-model="name" />
    </div>
    <div class="flex items-center gap-3 mb-5">
      <label for="role" class="font-semibold w-[6rem]">Type</label>
      <Dropdown v-model="role" :options="roles" optionLabel="name" placeholder="Select a type" class="flex-auto" />
    </div>
    <div class="flex justify-end gap-2">
      <PButton type="button" label="Cancel" severity="secondary" @click="handleClose"></PButton>
      <PButton type="button" label="Save" @click="handleSubmit"></PButton>
    </div>
  </PDialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import PButton from 'primevue/button'
import PDialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { useToast } from 'primevue/usetoast'

const Modal = defineComponent({
  emits: ['close'],
  name: 'NewStakeholderModal',
  components: {
    PButton,
    PDialog,
    InputText,
    Dropdown
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      default: () => { }
    },
    availableStakeholders: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const isVisible = ref<boolean>(props.visible)
    const name = ref('')
    const role = ref('')
    const roles = [
      { name: 'Internal', value: 'Internal' },
      { name: 'External', value: 'External' }
    ]
    const toast = useToast()

    watch(
      () => props.visible,
      (newValue) => {
        isVisible.value = newValue
      }
    )

    const handleClose = () => {
      isVisible.value = false
      emit('close', isVisible.value)
    }

    const handleSubmit = () => {
      if (!name.value || !role.value) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill in all fields',
          life: 3000
        })
        return
      }
      isVisible.value = false
      emit('close', isVisible.value)
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Stakeholder created successfully',
        life: 3000
      })
      props.onClose()
    }

    return {
      name,
      role,
      roles,
      isVisible,
      handleClose,
      handleSubmit
    }
  }
})

export default Modal
</script>

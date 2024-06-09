<template>
  <Dialog v-model:visible="isVisible" modal header="Create resource" :style="{ width: '25rem' }" :closable="false">
    <span class="text-surface-600 dark:text-surface-0/70 block mb-5">A resource is xxxx</span>
    <div class="flex items-center gap-3 mb-3">
        <label for="name" class="font-semibold w-[6rem]">Name</label>
        <InputText id="name" class="flex-auto" autocomplete="off" v-model="name" />
    </div>
    <div class="flex items-center gap-3 mb-5">
        <label for="role" class="font-semibold w-[6rem]">Role</label>
        <InputText id="role" class="flex-auto" autocomplete="off" v-model="role"/>
    </div>
    <div class="flex justify-end gap-2">
        <PButton type="button" label="Cancel" severity="secondary" @click="handleClose"></PButton>
        <PButton type="button" label="Save" @click="handleClose"></PButton>
    </div>
</Dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch} from 'vue'
import PButton from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const Modal = defineComponent({
  emits: ['close'],
  name: 'Modal',
  components: {
    PButton,
    Dialog,
    InputText
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      default: () => {}
    }
  },
  setup(props, {emit}) {
    const isVisible = ref<boolean>(props.visible)
    const name = ref('')
    const role = ref('')

    watch(() => props.visible, (newValue) => {
      isVisible.value = newValue
    })

    const handleClose = () => {
      isVisible.value = false
emit('close', isVisible.value)
      props.onClose()
    }

    return {
      name,
      role,
      isVisible,
      handleClose
    }
  }
})

export default Modal
</script>

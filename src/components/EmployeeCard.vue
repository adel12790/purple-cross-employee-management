<template>
  <div class="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <div class="p-4">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-semibold text-gray-800">{{ employee.fullName }}</h3>
        <div class="flex space-x-2">
          <router-link
            :to="'/employees/' + employee.id"
            class="p-1 text-blue-600 hover:text-blue-700"
            title="View"
          >
            <ViewIcon />
          </router-link>
          <router-link
            :to="'/employees/' + employee.id + '/edit'"
            class="p-1 text-yellow-600 hover:text-yellow-700"
            title="Edit"
          >
            <EditIcon />
          </router-link>
          <BaseButton
            @click="$emit('delete', employee)"
            variant="danger"
            class="p-1"
            title="Delete"
          >
            <DeleteIcon />
          </BaseButton>
        </div>
      </div>
      
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-gray-500">Occupation:</span>
          <span class="text-sm text-gray-700">{{ employee.occupation }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-500">Department:</span>
          <span class="text-sm text-gray-700">{{ employee.department }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-500">Status:</span>
          <span class="text-sm text-gray-700">{{ formatEmploymentStatus(employee.employmentDate) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-500">Termination:</span>
          <span class="text-sm text-gray-700">{{ formatTerminationStatus(employee.terminationDate) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import ViewIcon from '@/assets/icons/ViewIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import { formatEmploymentStatus, formatTerminationStatus } from '@/utils/format'

export default {
  name: 'EmployeeCard',
  components: {
    BaseButton,
    ViewIcon,
    EditIcon,
    DeleteIcon
  },
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  emits: ['delete'],
  setup() {
    return {
      formatEmploymentStatus,
      formatTerminationStatus
    }
  }
}
</script> 
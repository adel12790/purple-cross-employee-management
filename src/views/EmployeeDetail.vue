<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Employee Details</h2>
      <div class="flex gap-3">
        <router-link
          to="/employees"
          class="px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
        >
          Back to List
        </router-link>
        <router-link
          :to="'/employees/' + employee.id + '/edit'"
          class="px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-sm"
        >
          Edit
        </router-link>
      </div>
    </div>

    <div v-if="employee" class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-sm font-medium text-gray-500">Employee Code</h3>
            <p class="mt-1 text-lg text-gray-900">{{ employee.code }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-500">Full Name</h3>
            <p class="mt-1 text-lg text-gray-900">{{ employee.fullName }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-500">Occupation</h3>
            <p class="mt-1 text-lg text-gray-900">{{ employee.occupation }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-500">Department</h3>
            <p class="mt-1 text-lg text-gray-900">{{ employee.department }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-500">Date of Employment</h3>
            <p class="mt-1 text-lg text-gray-900">{{ formatDate(employee.employmentDate) }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-500">Termination Date</h3>
            <p class="mt-1 text-lg text-gray-900">{{ formatDate(employee.terminationDate) }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-500">Email</h3>
            <p class="mt-1 text-lg text-gray-900">{{ employee.email || 'N/A' }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-500">Phone</h3>
            <p class="mt-1 text-lg text-gray-900">{{ employee.phone || 'N/A' }}</p>
          </div>

          <div class="md:col-span-2">
            <h3 class="text-sm font-medium text-gray-500">Address</h3>
            <p class="mt-1 text-lg text-gray-900">{{ employee.address || 'N/A' }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <BaseButton
            variant="danger"
            @click="handleDelete"
          >
            Delete Employee
          </BaseButton>
        </div>
      </div>
    </div>

    <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <p class="text-yellow-700">Employee not found</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import { formatDate, formatEmploymentStatus, formatTerminationStatus } from '@/utils/format'

export default {
  name: 'EmployeeDetail',
  components: {
    BaseButton
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const employee = computed(() => 
      store.getters.getEmployeeById(route.params.id)
    )

    return {
      employee,
      formatDate,
      formatEmploymentStatus,
      formatTerminationStatus
    }
  }
}
</script>

<style scoped>
.btn-group {
  gap: 0.5rem;
}
</style> 
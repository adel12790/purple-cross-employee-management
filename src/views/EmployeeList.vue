<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Employee List</h2>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6">
        <div class="mb-6">
          <input
            type="text"
            class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
            v-model="searchQuery"
            placeholder="Search employees..."
          >
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="employee in filteredAndSortedEmployees" :key="employee.id" 
               class="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div class="p-4">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-semibold text-gray-800">{{ employee.fullName }}</h3>
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
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import BaseButton from '@/components/BaseButton.vue'
import ViewIcon from '@/assets/icons/ViewIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'

export default {
  name: 'EmployeeList',
  components: {
    BaseButton,
    ViewIcon,
    EditIcon,
    DeleteIcon
  },
  setup() {
    const store = useStore()
    const searchQuery = ref('')
    const sortKey = ref('fullName')
    const sortOrder = ref('asc')

    const filteredAndSortedEmployees = computed(() => {
      let filtered = store.getters.getAllEmployees.filter(employee => {
        const searchLower = searchQuery.value.toLowerCase()
        return (
          employee.fullName.toLowerCase().includes(searchLower) ||
          employee.occupation.toLowerCase().includes(searchLower) ||
          employee.department.toLowerCase().includes(searchLower)
        )
      })

      return filtered.sort((a, b) => {
        let aVal = a[sortKey.value]
        let bVal = b[sortKey.value]
        if (sortOrder.value === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })
    })

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortKey.value = key
        sortOrder.value = 'asc'
      }
    }

    const formatEmploymentStatus = (date) => {
      const employmentDate = new Date(date)
      const today = new Date()
      if (employmentDate > today) {
        return 'Employed soon'
      }
      return 'Currently employed'
    }

    const formatTerminationStatus = (date) => {
      if (!date) return 'N/A'
      const terminationDate = new Date(date)
      const today = new Date()
      if (terminationDate > today) {
        return 'To be terminated'
      }
      return 'Terminated'
    }


    return {
      searchQuery,
      sortKey,
      sortOrder,
      filteredAndSortedEmployees,
      sortBy,
      formatEmploymentStatus,
      formatTerminationStatus,
    }
  }
}
</script>

<style scoped>
.btn-group {
  gap: 0.25rem;
}
</style> 
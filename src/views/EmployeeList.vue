<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Employee List</h2>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <div class="flex-1 max-w-md">
            <input
              type="text"
              class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
              v-model="searchQuery"
              placeholder="Search employees..."
            >
          </div>
          <div class="flex space-x-3">
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept=".csv"
              @change="handleFileUpload"
            >
            <BaseButton
              variant="secondary"
              @click="$refs.fileInput.click()"
            >
              Import CSV
            </BaseButton>
            <BaseButton
              variant="secondary"
              @click="exportToCSV"
            >
              Export CSV
            </BaseButton>
            <router-link
              to="/employees/create"
              class="px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
            >
              Create Employee
            </router-link>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="employee in filteredAndSortedEmployees" :key="employee.id" 
               class="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
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
                    @click="confirmDelete(employee)"
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
import { formatEmploymentStatus, formatTerminationStatus } from '@/utils/format'

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
    const fileInput = ref(null)

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

    const exportToCSV = () => {
      const headers = ['Full Name', 'Occupation', 'Department', 'Employment Date', 'Termination Date', 'Email', 'Phone', 'Address']
      const csvContent = [
        headers.join(','),
        ...filteredAndSortedEmployees.value.map(employee => [
          `"${employee.fullName}"`,
          `"${employee.occupation}"`,
          `"${employee.department}"`,
          `"${employee.employmentDate}"`,
          `"${employee.terminationDate || ''}"`,
          `"${employee.email || ''}"`,
          `"${employee.phone || ''}"`,
          `"${employee.address || ''}"`
        ].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'employees.csv'
      link.click()
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        const rows = text.split('\n')
        const headers = rows[0].split(',').map(h => h.replace(/"/g, '').trim())
        
        // Get all existing employees and find the highest ID
        const existingEmployees = store.getters.getAllEmployees
        const maxId = Math.max(...existingEmployees.map(emp => emp.id), 0)
        let nextId = maxId + 1

        const employees = rows.slice(1).map(row => {
          const values = row.split(',').map(v => v.replace(/"/g, '').trim())
          return {
            id: nextId++, // Increment ID for each new employee
            fullName: values[0],
            occupation: values[1],
            department: values[2],
            employmentDate: values[3],
            terminationDate: values[4] || null,
            email: values[5] || null,
            phone: values[6] || null,
            address: values[7] || null
          }
        })

        employees.forEach(employee => {
          store.dispatch('addEmployee', employee)
        })

        // Reset file input
        event.target.value = ''
      }
      reader.readAsText(file)
    }

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortKey.value = key
        sortOrder.value = 'asc'
      }
    }

    const confirmDelete = (employee) => {
      if (confirm(`Are you sure you want to delete ${employee.fullName}?`)) {
        store.dispatch('deleteEmployee', employee.id)
      }
    }

    return {
      searchQuery,
      sortKey,
      sortOrder,
      filteredAndSortedEmployees,
      fileInput,
      sortBy,
      formatEmploymentStatus,
      formatTerminationStatus,
      confirmDelete,
      exportToCSV,
      handleFileUpload
    }
  }
}
</script>

<style scoped>
.btn-group {
  gap: 0.25rem;
}
</style> 
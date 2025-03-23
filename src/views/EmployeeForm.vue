<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">{{ isEdit ? 'Edit Employee' : 'Create Employee' }}</h2>
      <router-link
        to="/employees"
        class="px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
      >
        Back to List
      </router-link>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-100">
      <div class="p-6">
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Employee Code *</label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                :class="{ 'border-red-500 focus:ring-red-200 focus:border-red-300': errors.code }"
                v-model="form.code"
                required
              >
              <p v-if="errors.code" class="mt-1 text-sm text-red-600">{{ errors.code }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                :class="{ 'border-red-500 focus:ring-red-200 focus:border-red-300': errors.fullName }"
                v-model="form.fullName"
                required
              >
              <p v-if="errors.fullName" class="mt-1 text-sm text-red-600">{{ errors.fullName }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Occupation *</label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                :class="{ 'border-red-500 focus:ring-red-200 focus:border-red-300': errors.occupation }"
                v-model="form.occupation"
                required
              >
              <p v-if="errors.occupation" class="mt-1 text-sm text-red-600">{{ errors.occupation }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Department *</label>
              <input
                type="text"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                :class="{ 'border-red-500 focus:ring-red-200 focus:border-red-300': errors.department }"
                v-model="form.department"
                required
              >
              <p v-if="errors.department" class="mt-1 text-sm text-red-600">{{ errors.department }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date of Employment</label>
              <input
                type="date"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                v-model="form.employmentDate"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
              <input
                type="date"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                v-model="form.terminationDate"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                v-model="form.email"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                v-model="form.phone"
              >
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white"
                v-model="form.address"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <router-link
              to="/employees"
              class="px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
            >
              Cancel
            </router-link>
            <BaseButton
              type="submit"
              variant="primary"
            >
              {{ isEdit ? 'Update' : 'Create' }}
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'EmployeeForm',
  components: {
    BaseButton
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const isEdit = computed(() => route.params.id !== undefined)

    const form = ref({
      code: '',
      fullName: '',
      occupation: '',
      department: '',
      employmentDate: '',
      terminationDate: '',
      email: '',
      phone: '',
      address: ''
    })

    const errors = ref({})

    const validateForm = () => {
      errors.value = {}
      let isValid = true

      if (!form.value.code) {
        errors.value.code = 'Employee code is required'
        isValid = false
      }

      if (!form.value.fullName) {
        errors.value.fullName = 'Full name is required'
        isValid = false
      }

      if (!form.value.occupation) {
        errors.value.occupation = 'Occupation is required'
        isValid = false
      }

      if (!form.value.department) {
        errors.value.department = 'Department is required'
        isValid = false
      }

      return isValid
    }

    const handleSubmit = () => {
      if (!validateForm()) return

      if (isEdit.value) {
        store.dispatch('updateEmployee', {
          ...form.value,
          id: parseInt(route.params.id)
        })
      } else {
        store.dispatch('addEmployee', form.value)
      }

      router.push('/employees')
    }

    onMounted(() => {
      if (isEdit.value) {
        const employee = store.getters.getEmployeeById(route.params.id)
        if (employee) {
          form.value = { ...employee }
        }
      }
    })

    return {
      form,
      errors,
      isEdit,
      handleSubmit
    }
  }
}
</script> 
<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="text-blue-600 text-xl font-bold">
                Purple Cross Employee Management
              </router-link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/employees"
                class="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                active-class="text-blue-600 bg-gray-50"
              >
                Employees
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
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

          <!-- User Avatar and Dropdown -->
          <div class="flex items-center">
            <div class="relative">
              <div class="flex items-center space-x-2 focus:outline-none">
                <img 
                  src="https://i.pravatar.cc/32?img=3" 
                  alt="User avatar"
                  class="h-8 w-8 rounded-full"
                >
                <span class="text-sm text-gray-700">John Doe</span>
              </div>
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
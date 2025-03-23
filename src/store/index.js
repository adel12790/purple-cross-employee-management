import { createStore } from 'vuex';
import employees from '../mock-data/employees.json';

export default createStore({
  state: {
    employees: [...employees]
  },
  mutations: {
    addEmployee(state, employee) {
      state.employees.push({
        ...employee,
        id: state.employees.length + 1
      });
    },
    updateEmployee(state, updatedEmployee) {
      const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees.splice(index, 1, updatedEmployee);
      }
    },
    deleteEmployee(state, employeeId) {
      state.employees = state.employees.filter(emp => emp.id !== employeeId);
    }
  },
  actions: {
    addEmployee({ commit }, employee) {
      commit('addEmployee', employee);
    },
    updateEmployee({ commit }, employee) {
      commit('updateEmployee', employee);
    },
    deleteEmployee({ commit }, employeeId) {
      commit('deleteEmployee', employeeId);
    }
  },
  getters: {
    getEmployeeById: (state) => (id) => {
      return state.employees.find(emp => emp.id === parseInt(id));
    },
    getAllEmployees: (state) => {
      return state.employees;
    }
  }
}); 
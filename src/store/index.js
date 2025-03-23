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
    deleteEmployee(state, employeeId) {
      state.employees = state.employees.filter(emp => emp.id !== employeeId);
    }
  },
  actions: {
    addEmployee({ commit }, employee) {
      commit('addEmployee', employee);
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
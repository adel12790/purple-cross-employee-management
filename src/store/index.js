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
    getAllEmployees: (state) => {
      return state.employees;
    }
  }
}); 
import { createRouter, createWebHistory } from 'vue-router';
import EmployeeList from '../views/EmployeeList.vue';
import EmployeeDetail from '../views/EmployeeDetail.vue';

const routes = [
  {
    path: '/',
    redirect: '/employees'
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/employees/:id',
    name: 'EmployeeDetail',
    component: EmployeeDetail
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 
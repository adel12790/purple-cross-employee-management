import { createRouter, createWebHistory } from 'vue-router';
import EmployeeList from '../views/EmployeeList.vue';
import EmployeeForm from '../views/EmployeeForm.vue';
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
    path: '/employees/create',
    name: 'EmployeeCreate',
    component: EmployeeForm
  },
  {
    path: '/employees/:id',
    name: 'EmployeeDetail',
    component: EmployeeDetail
  },
  {
    path: '/employees/:id/edit',
    name: 'EmployeeEdit',
    component: EmployeeForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 
import { RouteRecordRaw } from 'vue-router';

function loadPage(path: string) {
  return () => import(`../pages/${path}.vue`);
}

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: loadPage('auth/LoginPage') },
      { path: 'register', component: loadPage('auth/RegisterPage') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: loadPage('WelcomePage') },
    ],
  },
  {
    path: '/github',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'add', component: loadPage('github/GithubAddPage') },
      { path: 'list', component: loadPage('github/GithubListPage') },
      { path: 'detail/:id', component: loadPage('github/GithubDetailPage') },
      { path: 'edit/:id', component: loadPage('github/GithubEditPage') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

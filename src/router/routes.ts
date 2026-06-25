import type { RouteRecordRaw } from 'vue-router'

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: '工作台', icon: 'House' },
  },
  {
    path: '/banners',
    name: 'Banners',
    component: () => import('@/views/banners/index.vue'),
    meta: { title: 'Banner 管理', icon: 'Picture' },
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/news/index.vue'),
    meta: { title: '资讯管理', icon: 'Document' },
  },
  {
    path: '/consultations',
    name: 'Consultations',
    component: () => import('@/views/consultations/index.vue'),
    meta: { title: '咨询管理', icon: 'ChatDotRound' },
  },
  {
    path: '/site-config',
    name: 'SiteConfig',
    component: () => import('@/views/site-config/index.vue'),
    meta: { title: '站点配置', icon: 'Setting' },
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: () => import('@/views/organizations/index.vue'),
    meta: { title: '机构管理', icon: 'OfficeBuilding' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
    meta: { title: '关于北展', icon: 'Tickets' },
  },
  {
    path: '/lawyers',
    name: 'Lawyers',
    component: () => import('@/views/lawyers/index.vue'),
    meta: { title: '律师管理', icon: 'User' },
  },
  {
    path: '/experts',
    name: 'Experts',
    component: () => import('@/views/experts/index.vue'),
    meta: { title: '专家管理', icon: 'Star' },
  },
  {
    path: '/practice-areas',
    name: 'PracticeAreas',
    component: () => import('@/views/practice-areas/index.vue'),
    meta: { title: '擅长领域管理', icon: 'Tickets' },
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', public: true },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: menuRoutes,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/exception/404.vue'),
    meta: { title: '404', public: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { public: true },
  },
]

export default routes

import Home from 'src/views/home/home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: {
      path: '/index',
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/index/index.vue'),
      },

      {
        path: '/my',
        name: 'my',
        component: () => import('../views/my/my.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
];

export default routes;

import routes from './routes';
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;

import { boot } from 'quasar/wrappers';
import { Router } from 'vue-router';
import { isAuthenticated } from 'src/auth';

export default boot(({ router }: { router: Router }) => {
  router.beforeEach((to, from, next) => {
    const publicPages = ['/auth/login', '/auth/register'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !isAuthenticated()) {
      next('/auth/login');
    } else {
      next();
    }
  });
});

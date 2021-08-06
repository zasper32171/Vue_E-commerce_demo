import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/LayoutMain.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Index.vue'),
      },
      {
        path: 'story',
        component: () => import('@/views/Story.vue'),
      },
      {
        path: 'events',
        component: () => import('@/views/Events.vue'),
      },
      {
        path: 'challenge',
        component: () => import('@/views/Challenge.vue'),
      },
      {
        path: 'products',
        component: () => import('@/views/Products.vue'),
      },
      {
        path: 'product',
        redirect: '/products',
      },
      {
        path: 'product/:id',
        component: () => import('@/views/Product.vue'),
      },
      {
        path: 'recipes',
        component: () => import('@/views/Recipes.vue'),
      },
      {
        path: 'recipe',
        redirect: '/recipes',
      },
      {
        path: 'recipe/:id',
        component: () => import('@/views/Recipe.vue'),
      },
      {
        path: 'shops',
        component: () => import('@/views/Shops.vue'),
      },
      {
        path: 'login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: 'cart',
        component: () => import('@/views/Cart.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/views/LayoutCheckout.vue'),
    children: [
      {
        path: 'checkout',
        component: () => import('@/views/Checkout.vue'),
      },
      {
        path: 'order/:id',
        component: () => import('@/views/Order.vue'),
      },
    ],
    redirect: '/',
  },
  {
    path: '/admin',
    component: () => import('@/views/LayoutAdmin.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/AdminOrders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('@/views/AdminCoupons.vue'),
      },
      {
        path: 'articles',
        component: () => import('@/views/AdminRecipes.vue'),
      },
    ],
    redirect: '/admin/products',
  },
  {
    path: '/:_(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior: () => ({ top: 0, left: 0 }),
});

export default router;

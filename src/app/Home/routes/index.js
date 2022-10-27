export const routes = [
  {
    name: "home",
    path: '/home',
    alias: '',
    component: () => import('../Home.vue'),
    meta: {
      pageTitle: 'title.home'
    },
  }
]

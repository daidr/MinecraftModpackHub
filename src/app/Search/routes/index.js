export const routes = [
  {
    name: "search",
    path: '/search/:ids',
    component: () => import('../Search.vue'),
    meta: {
      pageTitle: 'title.search'
    },
  }
]

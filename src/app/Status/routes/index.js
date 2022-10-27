export const routes = [
  {
    name: "status",
    path: '/status',
    component: () => import('../Status.vue'),
    meta: {
      pageTitle: 'title.status'
    },
  }
]

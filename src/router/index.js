import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import(/* webpackChunkName: "about" */ '../views/recommend.vue')

const Singer = () => import(/* webpackChunkName: "about" */ '../views/singer.vue')

const Search = () => import(/* webpackChunkName: "about" */ '../views/search.vue')

const TopList = () => import(/* webpackChunkName: "about" */ '../views/top-list.vue')

const SingerDetail = () => import(/* webpackChunkName: "about" */ '../views/singer-detail.vue')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    name: 'TopList',
    component: TopList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

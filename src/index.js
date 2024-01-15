import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
     path: "/newpage",
     name: "newpage",
     component : () => import("../views/newPage.vue")
  },
  {
    path:"/css-practice",
    name:"CssPractice",
    component: () => import("../views/CssPractice.vue")
  },
  {
    path:"/myform",
    name:"MyForm",
    component:() => import("../views/MyForm.vue")
  },
  {
    path:"/basic-template",
    name:"BasicTemplate",
    component: () => import("./views/BasicTemplate.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

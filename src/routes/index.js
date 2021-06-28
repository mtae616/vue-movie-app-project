import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  // Hash 모드
  // https://google.com/#/search 로 접근하는 모드
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  // page 들을 구분
  routes: [
    {
      // https://google.com/
      path: '/',
      component: Home
    },
    { // path 에 원하는 변수로 맵핑 가능
      path: '/movie/:id',
      component: Movie
    },
    {
      // https://google.com/about
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})
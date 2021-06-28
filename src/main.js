import { createApp } from 'vue'
import App from './App.vue'
import router from './routes' //특정한 폴더에 있는 index 라는 파일은 생략 가능
import store from './store' //원형은 ./routes/index.js , ./store/index.js
import loadImage from './plugins/loadImage'

createApp(App)
  .use(router) //$route, $router
  .use(store) //$store
  .use(loadImage)
  .mount('#app')
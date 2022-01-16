import VueRouter from 'vue-router'
import Home from './components/Home/Home.vue'
import Upload from './components/Upload/Upload.vue'
import View from './components/View/View.vue'

export default new VueRouter({
   routes:[
      {
         path: "/",
         component: Home
      },
      {
         path: "/cats/new",
         component: Upload
      },
      {
         path: "/cats/my",
         component: View
      }
   ],
   mode: 'history'
})
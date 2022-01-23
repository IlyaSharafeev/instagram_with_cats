<template>
   <div class="main">
      <Switter v-for="swit of this.getImagesCats" :key="swit.id" v-bind:swit="swit" />
   </div>
</template>

<script>
   import {
      mapActions,
      mapGetters
   } from "vuex";
   import Switter from "./Switter/Switter.vue";
   export default {
      name: "Home",
      components: {
         Switter,
      },
      computed: {
         ...mapGetters(['getImagesCats'])
      },
      data() {
         return {
            flag: true
         }
      },
      beforeMount() {
         window.addEventListener("scroll", this.trigger);
         if (this.getImagesCats.length == 0) {
           this.getImagesCatsFromApi()
         }
      },
      mounted() {
         window.addEventListener("scroll", this.throttle(this.checkPosition, 5000))
         window.addEventListener("resize", this.throttle(this.checkPosition, 5000))
      },
      methods: {
         ...mapActions(["getImagesCatsFromApi"]),
         checkPosition() {
            // Нам потребуется знать высоту документа и высоту экрана.
            const height = document.body.offsetHeight
            const screenHeight = window.innerHeight

            // Они могут отличаться: если на странице много контента,
            // высота документа будет больше высоты экрана (отсюда и скролл).

            // Записываем, сколько пикселей пользователь уже проскроллил.
            const scrolled = window.scrollY

            // Обозначим порог, по приближении к которому
            // будем вызывать какое-то действие.
            // В нашем случае — четверть экрана до конца страницы.
            const threshold = height - screenHeight / 4

            // Отслеживаем, где находится низ экрана относительно страницы.
            const position = scrolled + screenHeight

            if (position >= threshold) {
               this.getImagesCatsFromApi()
            }
         },
         throttle(callee, timeout) {
            let timer = null

            return function perform(...args) {
               if (timer) return

               timer = setTimeout(() => {
                  callee(...args)

                  clearTimeout(timer)
                  timer = null
               }, timeout)
            }
         }
      }
   };
</script>

<style>
   .main {
      margin-top: 5%;
   }

   .posts__loading {
      width: 100%;
      height: 1px;
      border: 1px solid red;
      position: relative;
      bottom: 0px;
      left: 0px;
   }
</style>
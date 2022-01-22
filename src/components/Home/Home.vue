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
            this.debounce(this.getImagesCatsFromApi(), 2500)
         }
      },
      methods: {
         ...mapActions(["getImagesCatsFromApi"]),
         trigger() {
            const height = document.body.offsetHeight
            const screenHeight = window.innerHeight
            const scrolled = window.scrollY
            var threshold = height - screenHeight / 4
            // Отслеживаем, где находится низ экрана относительно страницы.
            var position = scrolled + screenHeight

            if (position >= threshold) {
               this.debounce(this.getImagesCatsFromApi(), 200)
            }
         },
         debounce(fn, ms) {
            let timeout;
            return function () {
               const fnCall = () => {
                  fn.apply(this, arguments)
               }

               clearTimeout(timeout)

               timeout = setTimeout(fnCall, ms)
            }
         }
      }
   };
</script>

<style>
   .main {
      margin-top: 5%;
   }
</style>
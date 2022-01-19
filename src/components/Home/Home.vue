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
      data(){
         return {
            flag: true
         }
      },
      beforeMount() {
         window.addEventListener("scroll", this.trigger);
         if(this.getImagesCats.length == 0){
            this.getImagesCatsFromApi()
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
               setTimeout((this.getImagesCatsFromApi()), 2000) 
            }
         },
      },
   };
</script>

<style>
   .main {
      margin-top: 5%;
   }
</style>
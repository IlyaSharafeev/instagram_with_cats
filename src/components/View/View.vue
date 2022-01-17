<template>
   <div class="main">
      <imageForSlide v-for="image of this.getMyCats" :key="image.id" v-bind:image="image"/>
   </div>
</template>

<script>
   import {
      mapGetters, mapActions
   } from 'vuex'
   import imageForSlide from './imageForSlide.vue'

   export default {
      components:{
         imageForSlide
      },
      data() {
         return {

         }
      },
      computed: {
         ...mapGetters(['getMyCats'])
      },
      methods:{
         ...mapActions(['getMyImagesCatsFromApi'])
      },
      created(){
         this.getMyImagesCatsFromApi()
      }
   }
</script>

<style>
   
</style>
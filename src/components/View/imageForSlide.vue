<template>
   <div class="box">
      <div class="slide">
         <img :src="this.image" />
      </div>
   </div>
</template>

<script>
   export default {
      props: ['image'],
   }
</script>

<style>
   .box {
      display: flex;
      flex-direction: column;
      width: 50%;
      align-items: center;
      justify-content: center;
      margin: 20px;
      margin-left: auto;
      margin-right: auto;
   }

   .box>div {
      width: 400px;
      height: 400px;
   }

   .box>div>img {
      width: 100%;
      height: 100%;
   }
</style>
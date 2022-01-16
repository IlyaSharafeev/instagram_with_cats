<template>
   <div id="app">
      <v-app>
         <v-main>
            <v-container class="container_label">
               <v-text-field class="title" @click='pickFile' v-model='image_name'>
               </v-text-field>
               <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
               <v-btn v-show="!uploading" class="chooseBtn" @click="pickFile">
                  Choose New Image
               </v-btn>
               <v-btn v-show="image_file && !uploading" class="upload" color="blue" @click="uploadFile">
                  Upload
               </v-btn>
               
               <div class="loading" v-if="this.getFlagSpinner">Loading&#8230;</div>
            </v-container>

            <v-container>
               <v-alert v-show="error_message" :value="true" type="error">
                  {{error_message}}
               </v-alert>
            </v-container>

         </v-main>
      </v-app>
   </div>
</template>

<script>
   import Vuetify from 'vuetify'
   import axios from 'axios'
   import {
      mapActions, mapGetters
   } from 'vuex'

   export default {
      vuetify: new Vuetify(),
      data() {
         return {
            image_name: "",
            image_file: "",
            image_url: "",
            uploading: false,
            uploaded_image: {},
            headers: [{
                  text: 'Name'
               },
               {
                  text: 'Confidence'
               }
            ],
            error_message: null,
         }
      },
      computed:{
         ...mapGetters(['getFlagSpinner'])
      },
      methods: {
         ...mapActions(['getMyImagesCatsFromApi', 'spinnerStart', 'spinnerEnd']),
         pickFile() {
            this.error_message = null
            this.$refs.image.click()
         },

         onFilePicked(e) {
            const files = e.target.files
            if (files[0] !== undefined) {
               this.image_name = files[0].name
               if (this.image_name.lastIndexOf('.') <= 0) {
                  return
               }
               const fr = new FileReader()
               fr.readAsDataURL(files[0])
               
               fr.addEventListener('load', () => {
                  this.image_url = fr.result
                  this.image_file = files[0]
               })
               
            } else {
               this.image_name = ''
               this.image_file = ''
               this.image_url = ''
            }
         },
         async uploadFile() {
            this.spinnerStart()
            let formData = new FormData();
            formData.append('file', this.image_file);

            try {
               axios.defaults.headers.common['x-api-key'] = "70d5920f-a09c-4dd8-8f17-f9f654d46902"
               let response = await axios.post('https://api.thecatapi.com/v1/images/upload', formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data'
                  }
               })
               console.log(response.data.url)
               this.uploaded_image = response.data
               this.spinnerEnd()
               this.image_file = null
               this.loadImageAnaylsis(this.uploaded_image.id)


            } catch (error) {
               console.log(error)
               this.error_message = error.response.data.message
               this.spinnerEnd()
               this.image_file = null
            }
         },
         async loadImageAnaylsis() {
            this.getMyImagesCatsFromApi()
         }
      }

   }
</script>

<style>
   #app {
      margin-top: 15%;
      text-align: center;
   }

   .test {
      background: aqua;
   }

   .chooseBtn {
      width: 50%;
      flex: 1 1 auto;
      margin: 10px;
      padding: 30px;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
      box-shadow: 0 0 20px #eee;
      border-radius: 10px;
      background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
      border: 0px;
   }

   .upload{
      width: 50%;
      flex: 1 1 auto;
      margin: 10px;
      padding: 30px;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
      box-shadow: 0 0 20px #eee;
      border-radius: 10px;
      background-image: linear-gradient(to right, #a1c4fd 0%, #096bdb 51%, #a1c4fd 100%);
      border: 0px;
   }

   .upload:hover{
      width: 50%;
      flex: 1 1 auto;
      margin: 10px;
      padding: 30px;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
      /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
      box-shadow: 0 0 20px #eee;
      border-radius: 10px;
      background-image: linear-gradient(to right, #2e3c53 0%, #096bdb 51%, #a1c4fd 100%);
      border: 0px;
      background-position: right center;
   }

   .chooseBtn:hover {
      background-position: right center;
      /* change the direction of the change here */
   }

   .uploading{
      font-size: 22px;
      text-transform: uppercase;
   }

   /* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
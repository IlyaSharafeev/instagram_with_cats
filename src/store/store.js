import Vue from "vue";
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
   actions: {
      getImagesCatsFromApi({
         commit
      }) {
         axios.defaults.headers.common['x-api-key'] = "70d5920f-a09c-4dd8-8f17-f9f654d46902"
         axios.get('https://api.thecatapi.com/v1/images/search', {params:{
            order: 'DESC',
            limit: 59
         }})
            .then((response) => {
               let arrUrl = [];
               for(let i = 0; i < response.data.length; i++){
                  arrUrl.push(response.data[i].url)
               }
               console.log(arrUrl)
               commit('setImagesCats', arrUrl)
               arrUrl = []
               return response;
            })
            .catch((error) => {
               console.log(error);
            })
      },
      postImageCatFromApi(
         commit, data) {
         axios.defaults.headers.common['x-api-key'] = "70d5920f-a09c-4dd8-8f17-f9f654d46902"
         axios.post('https://api.thecatapi.com/v1/images/upload', data, {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            })
            .then((response) => {
               console.log(response)
               return response;
            })
            .catch((error) => {
               console.log(error);
            })
      },
      getMyImagesCatsFromApi({
         commit
      }) {
         axios.defaults.headers.common['x-api-key'] = "70d5920f-a09c-4dd8-8f17-f9f654d46902"
         axios.get('https://api.thecatapi.com/v1/images', {params:{
            limit: 100
         }})
            .then((response) => {
               let arrUrl = [];
               for(let i = 0; i < response.data.length; i++){
                  arrUrl.push(response.data[i].url)
               }
               console.log(arrUrl)

               // let arrId = [];
               // for(let i = 0; i < response.data.length; i++){
               //    arrId.push(response.data[i].id)
               // }
               // console.log(arrId)

               commit('setMyImagesCats', arrUrl)
               return response;
            })
            .catch((error) => {
               console.log(error);
            })
      },
      spinnerStart({
         commit
      }){
         commit('startSpinner', true)
      },
      spinnerEnd({
         commit
      }){
         commit('endSpinner', false)
      }
   },
   mutations: {
      setImagesCats(state, data) {
         for(let i = 0; i < data.length; i++){ 
            state.imagesCats.push(data[i])
         }
      },
      setMyImagesCats(state, data) {
         state.myCats = data
      },
      startSpinner(state, data){
         state.flagSpinner = data
      },
      endSpinner(state, data){
         state.flagSpinner = data
      }
   },
   state: {
      imagesCats: [],
      myCats: [],
      flagSpinner: false
   },
   getters: {
      getImagesCats(state) {
         return state.imagesCats
      },
      getMyCats(state) {
         return state.myCats
      },
      getFlagSpinner(state){
         return state.flagSpinner
      }
   }
})
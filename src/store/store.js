import Vue from "vue";
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
   actions: {
      getImagesCatsFromApi({
         commit
      }) {
         let countPage = localStorage.getItem('countPage');
         axios.defaults.headers.common['x-api-key'] = "70d5920f-a09c-4dd8-8f17-f9f654d46902"
         axios.get('https://api.thecatapi.com/v1/images/search', {params:{
            order: 'Desc',
            limit: 20,
            page: countPage,
            size: 'small'
         }})
            .then((response) => {
               let arrUrl = [];
               for(let i = 0; i < response.data.length; i++){
                  arrUrl.push(response.data[i].url)
               }
               commit('setImagesCats', arrUrl)
               arrUrl = [];
               localStorage.setItem('countPage', ++countPage) 
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
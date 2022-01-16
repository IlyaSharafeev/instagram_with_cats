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
         axios.get('https://api.thecatapi.com/v1/images/search')
            .then((response) => {
               commit('setImagesCats', response.data[0].url)
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
         axios.get('https://api.thecatapi.com/v1/images')
            .then((response) => {
               commit('setMyImagesCats', response.data[0].url)
               console.log(response)
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
         state.imagesCats.push(data)
      },
      setMyImagesCats(state, data) {
         state.myCats.push(data)
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
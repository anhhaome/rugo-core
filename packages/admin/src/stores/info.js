import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', {
  state:  () => ({
    info: null
  }),
  
  actions: {
    setInfo(data){
      this.info = data;
    }
  }
})
import { MHttpPlugin } from '../../lib';

export default {
  install: (app) => {
    let http;
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    MHttpPlugin.install({
      provide(_, obj){
        http = obj;
      }
    });

    app.provide("api", {
      http,

      get token(){
        return this.http.token;
      },

      set token(value){
        this.http.token = value;
      },

      async post(url, payload){
        const http = this.http.createHttpClient(baseURL);
        const res = await http.post(url, payload);
        return res.data;
      },
  
      async get(url){
        const http = this.http.createHttpClient(baseURL);
        const res = await http.get(url);
        return res.data;
      },
  
      async patch(url, payload){
        const http = this.http.createHttpClient(baseURL);
        const res = await http.patch(url, payload);
        return res.data;
      },
  
      async delete(url){
        const http = this.http.createHttpClient(baseURL);
        const res = await http.delete(url);
        return res.data;
      }
    });
  },
};

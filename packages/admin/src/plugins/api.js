import { MHttpPlugin } from '../../lib';
import { API_INFO, API_SIGN_IN, TOKEN_NAME } from '../constants';

export default {
  install: (app) => {
    let http;
    const baseURL = import.meta.env.ADMIN_API_BASE_URL;

    const handleResponse = ({ data }) => {
      if (data.status !== 'success')
        throw new Error(data.data);

      return data.data;
    }

    // http
    MHttpPlugin.install({
      provide(_, obj){
        http = obj;
      }
    });

    http.token = sessionStorage.getItem(TOKEN_NAME);

    // api
    const api = {
      http,

      get token(){
        return this.http.token;
      },

      set token(value){
        this.http.token = value;

        if (!value)
          sessionStorage.removeItem(TOKEN_NAME)
        else
          sessionStorage.setItem(TOKEN_NAME, value);
      },

      async signIn(payload){
        const token = await this.post(API_SIGN_IN, payload);
        this.token = token;
        return token;
      },

      async getInfo(){
        return await this.get(API_INFO);
      },

      async post(url, payload){
        const http = this.http.createHttpClient(baseURL);
        const res = await http.post(url, payload);
        return handleResponse(res);
      },
  
      async get(url){
        const http = this.http.createHttpClient(baseURL);
        const res = await http.get(url);
        return handleResponse(res);
      },
  
      async patch(url, payload){
        const http = this.http.createHttpClient(baseURL);
        const res = await http.patch(url, payload);
        return handleResponse(res);
      },
  
      async delete(url){
        const http = this.http.createHttpClient(baseURL);
        const res = await http.delete(url);
        return handleResponse(res);
      }
    };

    app.provide("api", api);

    // model
    const model = name => ({
      async list(){
        return await api.get(`/api/${name}`);
      }
    })

    app.provide("model", model);
  },
};

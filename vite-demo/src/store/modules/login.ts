import { defineStore } from 'pinia';

export const loginStore = defineStore('login', {
  state: () => {
    return {
      token: '1213'
    };
  }
});

import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';
// 引入less用于定制化样式
// import './theme/default-vars.less';

const app = createApp(App);
app.use(pinia);

app.mount('#app');

/* const a = () => {
  console.log('i am a');
  console.log(b);
};

const b = () => {
  console.log('i am b');
}; */

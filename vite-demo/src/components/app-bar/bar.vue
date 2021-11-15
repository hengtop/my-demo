<template>
  <div class="btn" @click="changeColor">我是bar</div>
  <a-button type="primary" @click="addCounter"
    >点击加+{{ count }}---{{ doubleCount }}---{{ login.token }}</a-button
  >
  <a-button type="primary" @click="reset">重置按钮</a-button>
</template>

<script lang="ts" setup>
import { countStore } from '@/store';
import { loginStore } from '@/store/modules/login';
import { storeToRefs } from 'pinia';
import { changeTheme } from '@/utils/change-css';
/* props/state */

/* vuex hooks */
const login = loginStore();
const counter = countStore();
const { count, doubleCount } = storeToRefs(counter);
/* other hooks */

/* 其他逻辑 */
const changeColor = () => {
  changeTheme('theme-green');
  console.log('切换颜色');
};

const addCounter = () => {
  console.log(counter.secret);
  counter.$patch({ count: counter.count + 1 });
};
const reset = () => {
  console.log(counter);
  counter.$reset();
};

counter.$subscribe((mutation, state) => {
  console.log(mutation, state);
});
</script>
<style lang="less" scoped></style>

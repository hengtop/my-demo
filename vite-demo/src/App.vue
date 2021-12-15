<template>
  <div class="app-container">
    <a-button type="primary">1Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
    <AppBar />
    <swiper
      class="swiper"
      :width="500"
      :height="150"
      :list="imgArr"
      item-key="id"
      :auto-play="false"
      :arrow="false"
      :dots="true"
      @change="handleChange"
      @slider-click="handleSliderClick"
    >
      <template #item="{ item }">
        <div class="item-container">
          <div class="title">{{ item.title }}</div>
          <div class="container">
            <div class="name">
              <div class="avatar"></div>
              <div class="name">{{ item.name }}</div>
            </div>
            <div class="time">
              <div>上次登录时间</div>
              <div>{{ item.lastload }}</div>
            </div>
          </div>
        </div>
      </template>
    </swiper>
  </div>
  <DownCount :time="time">
    <template #time="{ d, h, m, s, hh, mm, ss }">
      {{ d }}--{{ h }}--{{ m }}--{{ s }}
      <br />
      {{ d }}--{{ hh }}--{{ mm }}--{{ ss }}
    </template>
  </DownCount>
  <button @click="changeShow">点击修改计数器倒计时</button>

  <appBar :testObj="testObj" :otherObj="13" />
  <appBar :testObj="testObj" :otherObj="14" />
</template>

<script lang="ts" setup>
/* props/state */
import { reactive, ref } from 'vue';
import swiper from '@/components/swiper';
import DownCount from '@/components/down-count';
import appBar from '@/components/app-bar';
import AppBar from '@/components/app-bar/bar.vue';

/* vuex hooks */
const editInfo = reactive({
  name: 'zhangsan',
  age: 18,
  firend: {
    name: '22333'
  }
});
const testObj = reactive({
  name: 'zhangsan',
  friend: {
    count: 1
  }
});
const arr = reactive([1, 2, 3]);
const imgArr = reactive([
  {
    id: '123',
    name: 'comen',
    lastload: '2021-10-10',
    title: '医院管理者工作站'
  },
  {
    id: '343',
    name: 'comen',
    lastload: '2021-10-10',
    title: '麻醉工作站'
  },
  {
    id: '545',
    name: 'comen',
    lastload: '2021-10-10',
    title: '复苏工作站'
  },
  {
    id: '132',
    name: 'comen',
    lastload: '2021-10-10',
    title: '007'
  },
  {
    id: '67',
    name: 'comen',
    lastload: '2021-10-10',
    title: '008'
  }
]);
const time = ref(888888);
/* other hooks */
/* 其他逻辑 */
const changeShow = () => {
  time.value = 999999;
};
const changeProps = () => {
  console.log('修改props');
  console.log(editInfo.value);
  editInfo.firend = { age: 1000 };
};
// 轮播切换时获取激活的index
const handleChange = (index: number) => {
  console.log(index);
};
// 点击获取当前激活的index
const handleSliderClick = (index: number) => {
  console.log(index);
};
</script>

<style lang="less" scoped>
.app-container {
  width: 800px;
  overflow: hidden;
}
.item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  background-image: linear-gradient(90deg, #00b3f0 1%, #409ff1 100%),
    linear-gradient(#fff, #fff);
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  transition-delay: 100ms;
  transition: all 0.5;
  .title {
    font-size: 15px;
    padding-bottom: 10px;
  }
  .container {
    border-top: 2px dotted #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: aqua;
    }
  }
}
:deep(.swiper) {
  transform: translateX(-20%);

  .active {
    .item-container {
      /* box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.8); */
    }
  }
  .prev::before,
  .next::before {
    background-color: #fff !important;
    opacity: 0.24;
  }
}
</style>

<template>
  <div
    class="slider-wrapper"
    :style="silderContainerStyle"
    @mouseenter="pause()"
    @mouseleave="play()"
  >
    <div
      class="slider-content"
      :class="mask ? 'mask' : ''"
      :style="sliderStyle"
    >
      <div
        class="slider"
        v-for="(item, index) in list"
        :key="item[itemKey]"
        :class="setClass(index)"
        @click="handleChangeSlider(index)"
      >
        <slot name="item" :item="item"></slot>
      </div>
      <i v-show="arrow" class="arrow-icon arrow-icon-left" @click="prev()">
        <slot name="arrow-left"> &lt;</slot>
      </i>
      <i v-show="arrow" class="arrow-icon arrow-icon-right" @click="next()">
        <slot name="arrow-right">&gt;</slot>
      </i>
    </div>
    <div v-if="dots" class="dot-wrapper">
      <i
        v-for="(item, index) in list"
        :key="item"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="handleChangeSlider(index)"
      >
        {{ item }}
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, PropType, watch } from 'vue';
/**
 * @Date: 2021-11-26 08:49:23
 * @author: zhangheng
 * @description: 一个简单的轮播组件
 * @param list 用于遍历的数组
 * @param itemKey 遍历数组的key的键名，默认为id
 * @param width 容器宽度
 * @param height 容器高度
 * @param imgType item 背景图片的填充模式
 * @param autoPlay 是否自动循环播放
 * @param mask 是否为方式在后方的item增加遮罩层
 * @param interval 轮播切换时间
 * @param dots 是否显示底部计数器
 * @param arrow 是否显示左右两侧切换箭头
   @slot item插槽，用于自定义展示item，item可以通过作用域插槽获取
   @event change 当轮播切换时触发，参数为当前激活的index
   @event sliderClick 点击当前触发的item，返回对应index
 * @return {*}
 */
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<any[]>,
      default() {
        return [];
      }
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    imgType: {
      type: String,
      default: 'percentage'
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 4000
    },
    dots: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: true
    },
    itemKey: {
      type: String,
      default: 'id'
    }
  },
  emits: ['sliderClick', 'change'],
  setup(props: any, { emit }) {
    const currentIndex = ref<number>(0);
    const timer = ref<any>(null);

    //监听currentIndex
    watch(currentIndex, (newValue) => {
      emit('change', newValue);
    });
    /* 设置样式 */
    const sliderStyle = computed(() => {
      return {
        perspective: props.width + 'px',
        backgroundSize:
          props.imgType === 'percentage' ? '100% 100%' : props.imgType
      };
    });
    const silderContainerStyle = computed(() => {
      return {
        width: props.width ? props.width + 'px' : '100%',
        height: props.height ? props.height + 'px' : '100%'
      };
    });
    const setClass = (index: number) => {
      let next =
        currentIndex.value === props.list.length - 1
          ? 0
          : currentIndex.value + 1;
      let prev =
        currentIndex.value === 0
          ? props.list.length - 1
          : currentIndex.value - 1;
      switch (index) {
        case currentIndex.value:
          return 'active';
        case next:
          return 'next';
        case prev:
          return 'prev';
        default:
          return '';
      }
    };

    /* 轮播操作逻辑 */

    /* 开始/暂停 */
    const pause = () => {
      clearInterval(timer.value);
      timer.value = null;
    };
    const play = () => {
      pause();
      if (props.autoPlay) {
        timer.value = setInterval(() => {
          next();
        }, props.interval);
      }
    };
    play();

    //下一张
    const next = (count = 1) => {
      currentIndex.value = (currentIndex.value + count) % props.list.length;
    };
    const prev = (count = -1) => {
      currentIndex.value =
        currentIndex.value === 0
          ? props.list.length - 1
          : currentIndex.value + count;
    };
    //上一张
    const changeSilder = (count: number) => {
      currentIndex.value = count;
    };
    //点击轮播图跳转
    const handleChangeSlider = (index: any) => {
      //点击当前轮播
      if (index === currentIndex.value) {
        emit('sliderClick', index);
      } else {
        changeSilder(index);
      }
    };
    //todo 点击底部的dot能跨级跳转

    return {
      currentIndex,
      timer,
      play,
      pause,
      next,
      prev,
      handleChangeSlider,
      setClass,
      sliderStyle,
      silderContainerStyle
    };
  }
});
</script>

<style lang="less" scoped>
.slider-wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 10px 0;
  position: relative;
  .slider-content {
    position: relative;
    width: 100%;
    height: calc(100% - 20px);
    .slider {
      //居中
      position: absolute;
      margin: 0;
      padding: 0;
      top: 0;
      left: 50%;
      width: 45%;
      height: 100%;
      transition: all 500ms ease-in-out;
      background-repeat: no-repeat;
      background-position: center;
      background-size: inherit;
      transform: translate3d(-50%, 0, -80px);
      z-index: 1;
      &::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0);
        transition-delay: 100ms !important;
        transition: all 500ms;
        cursor: pointer;
        overflow: hidden;
      }
      &.active {
        transform: translate3d(-50%, 0, 0);
        z-index: 20;
        background-color: #bfa;
      }
      &.prev {
        transform: translate3d(-125%, 0, -100px);
        z-index: 19;
        background-color: aqua;
      }
      &.next {
        transform: translate3d(25%, 0, -100px);
        z-index: 18;
        background-color: bisque;
      }
    }

    .arrow-icon {
      width: 17.5%;
      display: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 22px;
      color: rgba(255, 255, 255, 0.5);
      text-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      z-index: 21;
    }
    .arrow-icon-left {
      left: 0;
    }
    .arrow-icon-right {
      right: 0;
    }

    &:hover {
      i {
        color: rgba(0, 0, 0, 0.8);
        display: block;
      }
    }
  }

  /* 蒙层 */
  .mask {
    .prev::before,
    .next::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .dot-wrapper {
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
      cursor: pointer;
      margin: 0 5px;
      display: block;
      text-indent: -9999px;
      width: 30px;
      height: 4px;
      background-color: #ccc;
      transition: background-color 0.5s;
    }
    .active {
      background-color: brown;
    }
  }
}
</style>

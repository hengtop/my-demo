<template>
  <div class="down-count-wrapper">
    <slot
      name="time"
      v-bind="{
        d: days,
        h: hours,
        m: mins,
        s: seconds,
        /* 这里的写法很妙，不用判断一位还是两位了可以自动补零 */
        hh: `00${hours}`.slice(-2),
        mm: `00${mins}`.slice(-2),
        ss: `00${seconds}`.slice(-2)
      }"
    >
      当前时间剩余：{{ days }}天--- {{ hours }}小时--- {{ mins }}分钟---
      {{ seconds }}秒</slot
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue';

interface formatTimeType {
  days: string | number;
  hours: string | number;
  mins: string | number;
  seconds: string | number;
}
/* props/state */
// eslint-disable-next-line no-undef
const props = defineProps({
  time: {
    type: [Number, String],
    default: 888888
  },
  isMilliSecond: {
    //传入的剩余时间是毫秒还是秒 true为毫秒 false为秒
    type: Boolean,
    default: false
  },
  end: {
    //传入的时间类型是截至日期
    type: [Number, String],
    default: 0
  }
});
//计时器标志
const timer = ref<any>(null);
const formatTime = reactive<formatTimeType>({
  days: '0',
  hours: '00',
  mins: '00',
  seconds: '00'
});
const { days, hours, mins, seconds } = toRefs(formatTime);
const currentTime = ref(0);
//单位统一换算为秒
const duration = computed(() => {
  //如果传入的是截至时间就有限以截止时间为准
  if (props.end) {
    let end = String(props.end).length >= 13 ? +props.end : +props.end * 1000;
    end -= Date.now();
    return Math.round(end / 1000);
  }
  const time = props.isMilliSecond
    ? Math.round(+props.time / 1000)
    : Math.round(+props.time);
  return time;
});

/* vuex hooks */

/* other hooks */
//进入页面开始计时
onMounted(() => {
  countDown();
});
/* 其他逻辑 */
//当传入的time改变时需要重新计时
watch(
  () => duration.value,
  () => {
    countDown();
  }
);

const countDown = () => {
  currentTime.value = Date.now();
  getTime(duration.value);
};
const getTime = (duration: number) => {
  //防止修改props的time导致开启两个计时器，导致计时器在交替计时两个倒计时
  timer.value && clearTimeout(timer.value);
  if (duration < 0) {
    return;
  }
  const { dd, hh, mm, ss } = durationFormatter(duration);
  formatTime.days = dd ?? 0;
  formatTime.hours = hh ?? 0;
  formatTime.mins = mm ?? 0;
  formatTime.seconds = ss ?? 0;

  timer.value = setTimeout(() => {
    //在手机端切屏最小化时可能导致定时器任务不执行，所以这段时间需要计算上
    const now = Date.now();
    const diffTime = Math.floor((now - currentTime.value) / 1000);
    const step = diffTime > 1 ? diffTime : 1;
    currentTime.value = now;
    getTime(duration - step);
  }, 1000);
};

//格式化时间
const durationFormatter = (time: number) => {
  if (!time) return { ss: 0 };
  let t = time;
  //秒数
  const ss = t % 60;
  t = (t - ss) / 60;
  //分钟不足一分钟
  if (t < 1) return { ss };
  const mm = t % 60;
  t = (t - mm) / 60;
  if (t < 1) return { ss, mm };
  const hh = t % 24;
  t = (t - hh) / 24;
  if (t < 1) return { hh, mm, ss };
  const dd = t;
  return { dd, hh, mm, ss };
};
</script>

<style lang="less" scoped>
.down-count-wrapper {
}
</style>

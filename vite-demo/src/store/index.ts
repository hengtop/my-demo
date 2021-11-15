import { defineStore, createPinia } from 'pinia'; // 从pinia中导入，defineStore方法，用于定义一个新的store
import { watch } from 'vue';
import debounce from 'lodash/debounce';

export const countStore = defineStore('counter', {
  state: () => {
    return {
      count: 0
    };
  },
  getters: {
    countPlusOne(state) {
      return state.count * 2 + 1;
    },
    doubleCount(state): number {
      console.log('this', this);
      return this.countPlusOne * 2 + state.count;
    }
  },
  actions: {
    increment() {
      this.count++;
    },
    searchContacts() {
      console.log('nihao');
    }
  },
  debounce: {
    //  给searchContacts这个action加了300毫秒防抖
    searchContacts: 300
  }
});

const pinia = createPinia();

function SecretPiniaPlugin() {
  return {
    secret: 'the cake is a lie'
  };
}
pinia.use(SecretPiniaPlugin);

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // 我们新的action会替换原来的
    return Object.keys(options.debounce).reduce(
      (debouncedActions: any, action) => {
        debouncedActions[action] = debounce(
          store[action],
          options.debounce![action]
        );
        return debouncedActions;
      },
      {}
    );
  }
});

console.log(pinia);
// 获取pinia
watch(
  pinia.state,
  (state) => {
    console.log(state);
  },
  { deep: true }
);

export default pinia;

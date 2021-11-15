import 'pinia';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // 在setter中，允许string类型和ref类型
    secret: string;
  }

  export interface DefineStoreOptionsBase<S, Store> {
    // 可以为任何的action定义一个数字
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>;
  }
}

// shims-vue.d.ts
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
    declare module './router';
    declare module './plugins/fontawesome';
  }
  
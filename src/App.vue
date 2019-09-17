<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{ token }}
    {{ age }}
    <div>
      <van-button type="primary" @click="changeText">Button</van-button>
    </div>
   
  </div>
</template>

<script lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class'
import types from './store/types/types';
@Component({
  name: 'app',
  components: {
    // HelloWorld: () => import(/* webpackChunkName: "helloword" */'@/components/HelloWorld.vue')
  }
})
export default class App extends Vue {
  @State("token") token!: string;
  @State("age")   age  !: number;
  @Mutation(types.TOKEN) setToken!: (data: string) => void

  public list: string[] = ['1', '2', '3'];
  public mounted() {
    console.log(this.token);
  }
  public changeText() {
    this.setToken('ffff');
    console.log(process.env.VUE_APP_URL, '///')
    this.$toast.success("message")
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

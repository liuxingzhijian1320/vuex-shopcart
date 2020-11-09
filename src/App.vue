<template>
  <div id="app">
    <ul>
      <router-link :to="{path: '/'}">首页</router-link>
      <router-link :to="{path: '/about'}">关于</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "APP",
  components: {},
  data() {
    return {};
  },
  setup(props) {},
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

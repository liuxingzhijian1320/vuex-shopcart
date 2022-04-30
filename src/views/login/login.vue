<style lang="scss">
</style>
<template>
  <div>
    <button @click="loginHander">登录</button>
  </div>
</template>

<script setup>
// import { defineComponent, reactive, toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const loginHander = () => {
  router.push("/");
};
</script>


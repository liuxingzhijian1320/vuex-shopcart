<style lang="scss">
.btns {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ccc;
  height: 100px;
  .btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
<template>
  <router-view></router-view>

  <div class="btns">
    <router-link class="btn" to="/index">Go to Index</router-link>
    <router-link class="btn" to="/my">Go to My</router-link>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>


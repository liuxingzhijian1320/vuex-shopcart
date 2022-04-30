<style lang="scss">
.title {
  text-align: center;
}
</style>
<template>
  <div>
    <h3 class="title">Vue3+vite+pinia版本购物车demo</h3>
    <Product></Product>
    <Cart></Cart>
    <Tool></Tool>
  </div>
</template>

<script setup>
import { mapState, storeToRefs } from "pinia";
import storeGoods from "../../store/modules/goods";
import Product from "../../components/product.vue";
import Cart from "../../components/cart.vue";
import Tool from "../../components/tool.vue";
</script>


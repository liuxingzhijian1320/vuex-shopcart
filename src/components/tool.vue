<style scoped>
</style>

<template>
  <!-- 计价器 -->
  <div class="item-wrapper">
    <div class='item'>总数：<strong>{{totalNum}}</strong></div>
    <div class='item'>总价：<strong>{{totalPrice}}</strong></div>
    <div class="item btn btn-danger" @click='clearAllCartHandler'>清空购物车</div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import storeGoods from "../store/modules/goods";
const store = storeGoods();
const { totalPrice, totalNum } = storeToRefs(store);
const clearAllCartHandler = (shop) => {
  store.clearAllCart(shop);
};
</script>

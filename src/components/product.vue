<style scoped>
a {
  color: #42b983;
}
</style>

<template>
  <!-- 产品 -->
  <div class="product">
    <h4>商品信息</h4>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>id</th>
          <th>名称</th>
          <th>价格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(shop,index) in shop_list'>
          <td>{{shop.id}}</td>
          <td>{{shop.name}}</td>
          <td>{{shop.price}}</td>
          <td>
            <div @click='addToCartHandler(shop)' class="btn btn-info">购物车</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// import { mapState } from "pinia";
import storeGoods from "../store/modules/goods";
const store = storeGoods();
let shop_list = store.shop_list;
const addToCartHandler = (shop) => {
  store.addToCart(shop);
};
</script>

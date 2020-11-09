<template>
  <div id="app">
    <!-- <ul>
      <router-link :to="{path: '/'}">首页</router-link>
      <router-link :to="{path: '/about'}">关于</router-link>
    </ul>
    <router-view></router-view> -->
    <h3>Vue3 购物车 demo</h3>
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
              <div @click='addToCart(shop)' class="btn btn-info">购物车</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 购物车 -->
    <div>
      <h4>已选商品</h4>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>id</th>
            <th>名称</th>
            <th>价格</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(shop,index) in cartProducts'>
            <td>{{shop.id}}</td>
            <td>{{shop.name}}</td>
            <td>{{shop.price}}</td>
            <td>{{shop.num}}</td>
            <td>
              <div @click='delProduct(shop)' class="btn btn-danger btn-sm">删除
              </div>
            </td>
          </tr>
          <tr v-if="!cartProducts">
            <td colspan="5" class="text-center">您的购物车空空如也。。。</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 计价器 -->
    <div class="item-wrapper">
      <div class='item'>总数：<strong>{{totalNum}}</strong></div>
      <div class='item'>总价：<strong>{{totalPrice}}</strong></div>
      <div class="item btn btn-danger" @click='clearAllCart'>清空购物车</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  computed,
} from "vue";
import { StateDataProps } from "./useProps";

const state: StateDataProps = {
  //商品列表
  shop_list: [
    {
      id: 11,
      name: "鱼香肉丝",
      price: 12,
    },
    {
      id: 22,
      name: "宫保鸡丁",
      price: 14,
    },
    {
      id: 34,
      name: "土豆丝",
      price: 10,
    },
    {
      id: 47,
      name: "米饭",
      price: 2,
    },
  ],
  //添加到购物车的商品
  added: [],
};

export default defineComponent({
  name: "APP",
  setup(props, context) {
    const { shop_list, added: cartProducts } = state;
    const totalNum = ref(0);

    const data = reactive({
      shop_list,
      cartProducts,
    });

    // 添加购物车
    const addToCart = (shop) => {
      const { id } = shop;
      let record = data.cartProducts.find((n) => n.id == id);
      if (!record) {
        data.cartProducts.push({
          ...shop,
          num: 1,
        });
      } else {
        record.num++;
      }
    };

    // 清空购物车
    const clearAllCart = () => {
      data.cartProducts = [];
    };

    // 删除指定商品
    const delProduct = ({ id }) => {
      data.cartProducts.forEach(({ id: sid }, i) => {
        if (id == sid) {
          data.cartProducts.splice(i, 1);
        }
      });
    };

    // 计算总价 和 总数量
    const totalPrice = computed(() => {
      let total = 0,
        amount = 0;
      data.cartProducts.forEach(({ price, num }) => {
        total += price * num;
      });
      return total;
    });

    // 计算总数量
    const totalNum = computed(() => {
      let total = 0;
      data.cartProducts.forEach(({ num }) => {
        total += num;
      });
      return total;
    });

    onMounted(() => {
      console.info("onMounted");
    });

    return {
      ...toRefs(data),
      totalNum,
      totalPrice,
      addToCart,
      clearAllCart,
      delProduct,
    };
  },
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

.item-wrapper {
  display: flex;
  background-color: #dfdfdf;
  align-items: center;
  justify-content: center;
}

.item {
  flex: 1;
}
</style>

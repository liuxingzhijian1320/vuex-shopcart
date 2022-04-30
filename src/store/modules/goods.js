import { defineStore } from 'pinia';

const storeGoods = defineStore('goods', {
  state: () => ({
    //商品列表
    shop_list: [
      {
        id: 11,
        name: '鱼香肉丝',
        price: 12,
      },
      {
        id: 22,
        name: '宫保鸡丁',
        price: 14,
      },
      {
        id: 34,
        name: '土豆丝',
        price: 10,
      },
      {
        id: 47,
        name: '米饭',
        price: 2,
      },
    ],
    cartProducts: [],
    totalPrice: 0,
    totalNum: 0,
  }),
  getters: {
    // 计算总价 和 总数量
    totalPrice() {
      let total = 0;
      this.cartProducts.forEach(({ price, num }) => {
        total += price * num;
      });
      return total;
    },

    // 计算总数量
    totalNum() {
      let total = 0;
      this.cartProducts.forEach(({ num }) => {
        total += num;
      });
      return total;
    },
  },
  actions: {
    // 添加购物车
    addToCart(shop) {
      const { id } = shop;
      let record = this.cartProducts.find((n) => n.id == id);
      if (record && record.num) {
        record.num++;
      } else {
        this.cartProducts.push({
          ...shop,
          num: 1,
        });
      }
    },
    // 删除指定商品
    delProduct({ id }) {
      this.cartProducts.forEach(({ id: sid }, i) => {
        if (id === sid) {
          this.cartProducts.splice(i, 1);
        }
      });
    },

    // 清空购物车
    clearAllCart() {
      this.cartProducts = [];
    },
  },
});

export default storeGoods;

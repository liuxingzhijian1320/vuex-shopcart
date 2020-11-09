import { createStore } from 'vuex'
// import cart from './modules/cart';

export default createStore({
  modules: {
    // cart,
  },
  strict: process.env.NODE_ENV !== 'production', // 严格模式
});

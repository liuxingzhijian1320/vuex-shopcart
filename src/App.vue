<template>
    <div id="app">
        <h3>Vuex购物车demo</h3>
        <!-- 商品的列表 -->
        <product></product>
        <!-- 购物车的列表 -->
        <cart></cart>
        <!-- 小记 -->
        <info></info>
    </div>
</template>

<script>
    import product from './components/product';
    import cart from './components/cart';
    import info from './components/info';
    
    export default {
        name: 'app',
        components: {
            product,
            cart,
            info
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>

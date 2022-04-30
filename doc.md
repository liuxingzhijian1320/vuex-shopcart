## Pinia 简介

Pinia 是 Vue 新一代的轻量级状态管理库，相当于 Vuex，也是 Vue 核心团队推荐的状态管理库。

同时支持 Vue2 和 Vue3，未来很有可能替代 Vuex，比 Vuex 更容易上手。

## 特性

Pinia 具有以下几点特性：

1. 直观，像定义 components 一样地定义 store
2. 完整的 Typescript 支持
3. 去除 mutations，只有 state，getters，actions
4. actions 支持同步和异步
5. Vue Devtools 支持 Pinia，提供更好的开发体验
6. 能够构建多个 stores ，并实现自动地代码拆分
7. 极其轻量（1kb），甚至感觉不到它的存在

## 图解 pinia

![请添加图片描述](https://img-blog.csdnimg.cn/ef2e691bc2a549089500dab1eea22d34.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAemhvb3Nvbg==,size_20,color_FFFFFF,t_70,g_se,x_16)
对比 vuex

![请添加图片描述](https://img-blog.csdnimg.cn/7c84f94b04c8424caa735627a485718b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAemhvb3Nvbg==,size_20,color_FFFFFF,t_70,g_se,x_16)

## Vuex 和 Pinia 的区别

1. Vuex：

- Vuex 的 store 需要一个主入口
- 通过 modules 属性，拆分成不同的模块
- 自动挂载在 Vue 实例上，通过 this.$store 去调用或者 mapGetters 等方法

2. Pinia：

- Pinia 的 store 不需要主入口
- 直接创建不同的 store 文件即可实现多模块
- 在使用时，直接通过 js 的模块导入，即可使用，可方便看到从哪个文件导入

## 安装 Pinia

```bash
yarn add pinia
# or with npm
npm install pinia
```

1. 引用（main.js）

```bash
import { createPinia } from 'pinia'
app.use(createPinia())
```

## 定义 Store

创建 store/user.js

```bash
import { defineStore } from 'pinia';

const storeUser = defineStore('user', {
  state: () => ({
    count: 0,
    username: '10个肉包子'
  }),
  getters: {},
  actions: {},
});

export default storeUser;
```

或者

```bash
export const useStore = defineStore({
	id: 'user',
    state: () => ({
        count: 0,
        username: '10个肉包子'
  	}),
 	getters: {},
  	actions: {},
})
```

## 使用 store

通过 import 导入 js 模块的方式引入，引入后，直接使用变量接收即可。

```bash
<script setup>
import storeUser from "../../store/user";
const { counter } = storeUser();
console.log(123, count);
</script>
```

以上为 pinia 的基础用法。

具体使用方法

## State

### 1. 定义 state

```bash
export default defineStore('user', {
    state: () => ({
    	count: 0,
        username: '10个肉包子'
  	}),
});
```

### 2. 使用 state

- 方法 1. 直接获取
  > 以 javascript 中的模块导出的方式导出 store 数据，state 中的数据均可通过变量.state 数据名获取

```bash
<script setup>
import storeUser from "../../store/user";
const { counter } = storeUser();
console.log(123, count);
</script>
```

- 方法 2. 解构获取
  > store 是一个 reactive 响应式对象，直接解构会使其失去响应式，类似 setup 中的 props，为了既可解构又可保持其响应式，可使用 storeToRefs，它将为每个 reactive 属性创建 refs

```bash
<script setup>
import { storeToRefs } from "pinia";
import storeUser from "../../store/user";
const { count } = storeToRefs(storeUser());
console.log(123, count);
</script>
<template>
    <div>
        {{ count }}
    </div>
</template>
```

### 3. 修改 state

- 直接修改 state：

```bash
<script setup>
import storeUser from "../../store/user";
const store = storeUser();
store.count++
console.log(123, store);
</script>
```

- $patch 已对象修改

```bash
<template>
  <div>index-{{store.count}}</div>
</template>
<script setup>
import storeUser from "../../store/user";
const store = storeUser();
store.$patch({
  count: 3,
});
</script>
```

缺点： 如果只需修改 state 数据中的某一项，仍然需要将整个对象传给 store。

或者

```bash
<template>
  <div>index-{{store.count}}</div>
</template>
<script setup>
import storeUser from "../../store/user";
const store = storeUser();
store.$patch(state =>{
	state.count = 3
});
</script>
```

### 4. 替换 state

```bash
<template>
  <div>index-{{store.count}}</div>
</template>
<script setup>
import storeUser from "../../store/user";
const store = storeUser();
store.$state = { count: 666, username: 'Paimon' }
</script>
```

### 5. 重置 state

> 一键回复默认的 state 数据

```bash
<style lang="scss">
</style>
<template>
  <div>index-{{store}}</div>
</template>

<script setup>
import storeUser from "../../store/user";
const store = storeUser();

store.$patch({
  count: 3,
});
setTimeout(() => {
  store.$reset();
}, 3000);
console.log(123, store);
</script>
```

### 6. 订阅 state

```bash
<style lang="scss">
</style>
<template>
  <div>index-{{store}}</div>
</template>

<script setup>
import storeUser from "../../store/user";
const store = storeUser();

store.$patch({
  count: 3,
});
setTimeout(() => {
  store.$reset();
}, 3000);

store.$subscribe((mutations, state) => {
  console.log(1, mutations);
  console.log(2, state);
});
</script>
```

在 pinia 实例上监听整个 state

```bash
<style lang="scss">
</style>
<template>
  <div>index-{{store}}</div>
</template>

<script setup>
import storeUser from "../../store/user";
import { watch } from "vue";
const store = storeUser();
store.$patch({
  count: 3,
});
setTimeout(() => {
  store.$reset();
  setTimeout(() => {
    store.$patch((state) => {
      state.count = 30;
    });
  }, 5000);
}, 3000);

watch(
  store,
  (state) => {
    console.log(11, state);
  },
  { deep: true }
);

console.log(123, store);
</script>

```

## Getters

### 1. 获取数据，建议使用尖头函数

```bash
export const useStore = defineStore('user', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
})
```

```
<template>
    <div> {{ doubleCount }} </div>
    <div> {{ counter }} </div>
</template>
<script setup>
import storeUser from "../../store/user";
import { storeToRefs } from 'pinia'
const store = storeUser();
const { doubleCount, counter } = storeToRefs(storeUser());
</script>
```

### 2. 访问其他 getters

访问其他的 getter 需要使用 `this`, 注意：不能使用尖头函数了

```
export const useStore = defineStore('user', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.counter * 2
    },
    doublePlusOne() {
      return this.doubleCount + 1
    },
  },
})
```

### 2. getters 传递参数

```
export const useStore = defineStore('user', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

```
<template>
  <p>User 2: {{ store.getUserById(2) }}</p>
</template>
<script setup>
import storeUser from "../../store/user";
const store = storeUser();
</script>
```

注意： getters are not cached anymore 即 getters 不会被缓存，只能函数调用。

### 3.访问其他的 getter

即想要哪个 getters 则调用哪个 getter，因为 pinia 没有总入口，和 vuex 有本质区别。

```
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

### 4. 使用 mapState 访问 store 中的数据

```
import { mapState } from 'pinia'
import storeUser from "../../store/user";

export default {
  computed: {
    ...mapState(storeUser, ['doubleCount'])
    ...mapState(storeUser, {
      myOwnName: 'doubleCounter',
      double: state => state.doubleCount,
    }),
  },
}
```

## Actions

### 1. 获取方法

```
export const useStore = defineStore('user', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

### 2. 使用方法

- 同步的方式

```
<script setup>
import storeUser from "../../store/user";
const store = storeUser();
</script>
<template>
    <button @click="store.increment()">增加</button>
</template>

```

- 异步的方式

```
import { mande } from 'mande'
const api = mande('/api/users')
export const useUsers = defineStore('users', {
  state: () => ({
    userData: {},
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        console.info(`Welcome back ${this.userData.name}!`)
      } catch (error) {
         console.error(error)
        return error
      }
    },
  },
})
```

### 3. 访问其他的 actions

和 getter 一样，直接引入其他的 store 即可

```
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

### 4. 使用 mapActions 访问 store 中的方法

```
import { mapActions } from 'pinia'
import storeUser from "../../store/user";

export default {
  methods: {
    ...mapActions(storeUser, ['increment'])
    ...mapActions(storeUser, { myOwnName: 'randomizeCounter' }),
  },
}
```

### 5. 订阅 actions

使用 store.$onAction()订阅 actions，传递给它的回调函数在 action 之前执行，after 在 actions resolves 之后执行，onError 在 actions 抛出异常和错误的时候执行。

```
const unsubscribe = someStore.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    // a shared variable for this specific action call
    const startTime = Date.now()
    // this will trigger before an action on `store` is executed
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // this will trigger if the action succeeds and after it has fully run.
    // it waits for any returned promised
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // this will trigger if the action throws or returns a promise that rejects
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// manually remove the listener
unsubscribe()
```

$onAction 一般是在组件的 setup 建立，它会随着组件的 unmounted 而自动取消。如果你不想让它取消订阅，可以将第二个参数设置为 true：

```
export default {
  setup() {
    const someStore = useSomeStore()

    // this subscription will be kept after the component is unmounted
    someStore.$onAction(callback, true)

    // ...
  },
}
```

## 总结

本文对 Pinia 的安装、state、getter、action 做了简单的介绍，

官方将 Pinia 中 mutation 移除了，即用即导入，配合 vue3 setup，使得 store 的使用更加灵活

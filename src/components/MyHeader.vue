<template>
  <nav class="navbar navbar-dark bg-primary mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">专栏</a>
      <div v-if="!user.isLogin">
        <button class="btn btn-success mr-3" type="submit">登录</button>
        <button class="btn btn-success" type="submit">注册</button>
      </div>
      <div class="btn-group" v-if="user.isLogin" @click="open">
        <button
          type="button"
          class="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          您好，{{ user.name }}
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item">退出登录</li>
          <li class="dropdown-item">编辑资料</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: "myHeader",
  data() {
    return {};
  },
  props: {
    user: {
      type: Object as PropType<UserProps>, // 类型断言
      required: true,
    },
  },
  setup(props) {},
});
</script>

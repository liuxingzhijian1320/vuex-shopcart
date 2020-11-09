<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in list" :key="column.id">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <img
            :src="column.avatar"
            alt=""
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // 类型断言
      required: true,
    },
  },
  setup(props) {},
});
</script>

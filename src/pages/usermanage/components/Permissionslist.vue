<script lang="ts" setup>
import { Tag, Space } from '@arco-design/web-vue';
import { number } from 'echarts/core';
import { ref, reactive, defineProps } from 'vue';
//接收数据
defineProps(['typedata']);

</script>

<template>
  <div v-for="(tag,index) in typedata" :key="index" :closable="true" >
    <Tag v-if="tag.type==1">{{tag.permissions.MySQL}}</Tag>
    <Tag v-else-if="tag.type==2">{{tag.permissions.DM}}</Tag>
    <Tag v-else>{{tag.permissions.KingBase}}</Tag>
  </div>
</template>

<script lang="ts" setup>
import { Result, Space, Button } from '@arco-design/web-vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

//const router = useRouter();

const handlePre = () => {
  emit('change-step', 0);
};
</script>

<template>
  <Card class="background">
    <Result status="success" title="用户修改成功" class="Result">
      <template #extra>
        <Space :size="16">
          <Button type="primary" @click="handlePre">再次修改</Button>
        </Space>
      </template>
    </Result>
  </Card>
</template>

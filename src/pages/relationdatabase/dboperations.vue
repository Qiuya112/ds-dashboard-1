<script lang="ts" setup>
import {
  Spin,
  Form,
  Table,
  FormItem,
  Select,
  Option,
  Input,
  InputNumber,
  InputPassword,
  Button,
  Row,
  Col,
  Tag,
  Divider,
  Card,
  Tree,
  Layout,
  LayoutSider,
  LayoutContent,
  LayoutFooter,
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { defineComponent } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { sql } from '@codemirror/lang-sql';
import { reactive, ref,watch} from 'vue';

import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { EXECUTE_DATABASE_URL } from '@/api/url';
//引入传回参数
import { SchemaParams} from '@/api/types';

const Testdata=ref()
const { data: res} = useAxios<ResponseWrap<SchemaParams>>(
  EXECUTE_DATABASE_URL,
  { method: 'GET' },
  instance,
);
const extensions = [sql()]
const SelectData = computed(() => {
  return res.value?.data?.names;
});

//监视，通过选择数据库名选择框的选择，来进行侧边树结构的更新
watch(
  Testdata,
  ()=>{

})


const view = shallowRef();
const handleReady = (payload: any) => {
  view.value = payload.view;
};
const state = reactive({
  type: '',
  code: '',
});
const treeData = [
  {
    title: "schema",
    children: [
      {
        title: '表',
        children: [
          {
            title: 'name',
          },
          {
            title: 'tt',
          },
        ],
      },
      {
        title: '视图',
        children: [
          {
            title: 'aa',
          },
        ],
      },
    ],
  },
];

const handleNodeClick = () => {
  console.log(treeData);
};
</script>

<template>
  <PageContainer>
    <Layout :style="{ height: '400px' }">
      <Layout>
        <LayoutSider :collapsible="true" class="sider">
          <Tree :data="treeData" @select="handleNodeClick" size="large"></Tree>
        </LayoutSider>
        <LayoutContent>
          <Card>
            <Row :gutter="2">
              <Col :span="2">
                <Button status="success" type="primary" @click="">
                  <template #icon>
                    <icon-play-circle />
                  </template>
                  运行
                </Button>
              </Col>
              <Divider direction="vertical" />
              <Col :span="2">
                <Button type="primary" status="danger" @click="">
                  <template #icon>
                    <icon-pause-circle />
                  </template>
                  停止
                </Button>
              </Col>
              <Divider direction="vertical" />
              <Col :span="2">
                <Button type="primary" @click="">
                  <template #icon>
                    <icon-bookmark />
                  </template>
                  格式化
                </Button>
              </Col>

              <Col :span="6"></Col>
              <Col :span="10">
                <Form :model="state">
                  <FormItem label="数据库名" filed="type">
                    <Select v-model="Testdata" placeholder="请选择使用的数据库" allow-clear>
                      <!--
                      <Option :value="1">MySQL</Option>
                      <Option :value="2">达梦数据库</Option>
                      <Option :value="3">金仓数据库</Option>
                      -->
                      <Option v-for="(item,index) in SelectData" :key="index">{{item}}</Option>
                    </Select>
                  </FormItem>
                </Form>
              </Col>
              <Col>
                <div class="codemirror">
                  <Codemirror
                    v-model="state.code"
                    :style="{ height: '360px', background: '#D4D4D4' }"
                    placeholder="请在此处输入sql语句..."
                    :autofocus="true"
                    :indent-with-tab="true"
                    :extensions="extensions"
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </LayoutContent>
      </Layout>
      <LayoutFooter>
        {{ state }}
      </LayoutFooter>
    </Layout>
  </PageContainer>
</template>

<style scoped lang="less">
.sider {
  background-color: #d4d4d4;
}
.codemirror {
  font-family: Arial, monospace;
  font-size: 20px;
  height: auto;
}
</style>

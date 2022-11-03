<script lang="ts" setup>
import {
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Option,
  Divider,
  Table,
  TableColumn,
  Button,
  Popconfirm,
  Modal,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';

import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { InQUERY_DATABASE_URL } from '@/api/url';
import { InqueryParams } from '@/api/types';

const form = reactive({
  type: '1',
  table: '',
  name: '',
  columnList: [{ column: '' }],
  whereList: [{ column: '', columnType: 'int', value: '', queryType: '>' }],
  groupByList: [{ column: '' }],
  orderByList: [{ type: 'ASC', column: '' }],
});

const handleAddInquery = () => {
  form.columnList.push({
    column: '',
  });
};
const handleAddGroup = () => {
  form.groupByList.push({
    column: '',
  });
};
const handleAddWhere = () => {
  form.whereList.push({
    column: '',
    columnType: '',
    value: '',
    queryType: '',
  });
};
const handleAddOrder = () => {
  form.orderByList.push({
    type: '',
    column: '',
  });
};
const handleDelteWhere = (index: number) => {
  form.whereList.splice(index, 1);
};
const handleDeleteInquery = (index: number) => {
  form.columnList.splice(index, 1);
};
const handleDeleteGroup = (index: number) => {
  form.groupByList.splice(index, 1);
};
const handleDeleteOrder = (index: number) => {
  form.orderByList.splice(index, 1);
};

//data为请求返回的数据,重命名为res--自定义操作
const { data } = useAxios<ResponseWrap<InqueryParams>>(
  InQUERY_DATABASE_URL,
  { method: 'POST' },
  instance,
);

//进行数据的检测,说明返回值中的data数据是否存在
const tabledata = computed(() => {
  return data.value?.data?.columnList;
});


</script>

<template>
  <PageContainer>
    <Card>
      <template #title> 单表数据库查询 </template>
      <Form :model="form" :style="{ width: '75%' }">
        <FormItem
          field="type"
          label="数据库类型"
          :content-flex="false"
          :merge-props="false"
          required
        >
          <Row :gutter="8">
            <Col :span="23">
              <FormItem no-style>
                <Select v-model="form.type" default-value="1">
                  <Option :value="1">MySQL</Option>
                  <Option :value="2">达梦数据库</Option>
                  <Option :value="3">金仓数据库</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem field="table" label="表名" :content-flex="false" :merge-props="false" required>
          <Row :gutter="8">
            <Col :span="23">
              <FormItem no-style>
                <Input v-model="form.table" placeholder="请输入查询表名" allow-clear />
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(post, index) of form.columnList"
          :field="`columnList.${index + 1}.column`"
          :label="`查询列名${index + 1}`"
          :key="index"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="20">
              <FormItem no-style>
                <Input v-model="post.column" placeholder="请输入查询列名" />
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button @click="handleAddInquery" type="primary" status="success" shape="circle">
                  <template #icon>
                    <icon-plus size="25" />
                  </template>
                </Button>
                <Button
                  @click="handleDeleteInquery(index)"
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  shape="circle"
                >
                  <template #icon>
                    <icon-close size="25" />
                  </template>
                </Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(post, index) in form.whereList"
          :field="`whereList.${index}`"
          :key="index"
          :label="`过滤条件${index + 1}`"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="5">
              <FormItem no-style>
                <Input v-model="post.column" placeholder="请输入查询列名" />
              </FormItem>
            </Col>
            <Col :span="5">
              <FormItem no-style>
                <Select v-model="post.columnType" defalut-value="int">
                  <Option>int</Option>
                  <Option>string</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="5">
              <FormItem no-style>
                <Input v-model="post.value" placeholder="请输入过滤条件值" />
              </FormItem>
            </Col>
            <Col :span="5">
              <FormItem no-style>
                <Select v-model="post.queryType">
                  <Option>&gt;</Option>
                  <Option>&lt;</Option>
                  <Option>like</Option>
                  <Option>=</Option>
                  <Option>&le;</Option>
                  <Option>&ge;</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button @click="handleAddWhere" type="primary" status="success" shape="circle">
                  <template #icon>
                    <icon-plus size="25" />
                  </template>
                </Button>

                <Button
                  @click="handleDelteWhere(index)"
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  shape="circle"
                >
                  <template #icon>
                    <icon-close size="25" />
                  </template>
                </Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(post, index) of form.groupByList"
          :field="`groupByList.${index + 1}.column`"
          :label="`分组列名${index + 1}`"
          :key="index"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="20">
              <FormItem no-style>
                <Input v-model="post.column" placeholder="请输入分组条件列" />
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button @click="handleAddGroup" type="primary" status="success" shape="circle"
                  ><template #icon> <icon-plus size="25" /> </template
                ></Button>
                <Button
                  @click="handleDeleteGroup(index)"
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  shape="circle"
                >
                  <template #icon> <icon-close size="25" /> </template
                ></Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(post, index) in form.orderByList"
          :field="`orderByList.${index}`"
          :key="index"
          :label="`排序条件${index + 1}`"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="10">
              <FormItem filed="orderByList.type" no-style>
                <Select v-model="post.type">
                  <Option>ASC</Option>
                  <Option>DESC</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="10">
              <FormItem no-style>
                <Input v-model="post.column" placeholder="请输入查询列名" />
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button @click="handleAddOrder" type="primary" status="success" shape="circle"
                  ><template #icon> <icon-plus size="25" /> </template
                ></Button>
                <Button
                  @click="handleDeleteOrder(index)"
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  shape="circle"
                >
                  <template #icon> <icon-close size="25" /> </template
                ></Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Button html-type="submit" type="primary">提交</Button>
        </FormItem>
      </Form>
      {{form}}
      <Divder />
      <Table row-key="uuid" :data="tabledata">
        <template #columns>
          <TableColumn title="列表" data-index="columnName" />
          <TableColumn title="列表类型" data-index="columnNameType" />
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>

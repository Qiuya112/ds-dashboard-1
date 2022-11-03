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
  Tag,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';

//子组件
import Successadd from './components/Successrevisepages.vue';
import ReviseForm from './components/Reviseuserdata.vue';
import Permission from './components/Permissionslist.vue';

import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { REQUEST_USERLIST_URL, DELETE_USER_URL } from '@/api/url';
//引入传回参数
import { UserlistData } from '@/api/types';

const visibleChange = ref(false);
const visibleAssignment = ref(false);

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

//data为请求返回的数据,重命名为res--自定义操作
const { data: res, execute } = useAxios<ResponseWrap<UserlistData>>(
  REQUEST_USERLIST_URL,
  { method: 'GET' },
  instance,
);

//删除操作
const { execute: deleteExecute, isLoading: deleteIsLoading } = useAxios(
  DELETE_USER_URL,
  { method: 'DELETE' },
  instance,
  {
    immediate: false,
  },
);

//进行数据的检测,说明返回值中的data数据是否存在
const tableData = computed(() => {
  return res.value?.data?.data;
});

//const temp = computed((i:number) => {
// for (var i = 0; i < 11; i++)
//  if (tableData[i].type == 1) return permissions.MySQL;
//else if (tableData[i].type == 2) return permissions.DM;
//else return permissions.KingBase;
//});
const step = ref(0);
const changeStep = (idx: number) => {
  step.value = idx;
};

//事件-搜索用户列表
const searchuserlist = () => {};

//编辑对话框
const reviseuserdata = () => {
  visibleChange.value = true;
};

//删除用户数据
const handleDeleteAccount = (uuid: string, type: 1 | 2 | 3, username: string, host: string) => {
  deleteExecute({ data: { uuid, type, username, host } }).then(() => {
    execute({ params: { pg: pagination.current, size: pagination.pageSize } });
  });
};

//分配权限对话框-获取表格行的数据-这里打印出表格行的type数据
const assignmentpermission = (row: any) => {
  visibleAssignment.value = true;
  console.log(row.type)
};
</script>

<template>
  <PageContainer>
    <Card>
      <Row justify="start" :gutter="20">
        <Col :span="15"></Col>
        <Col :span="5">
          <Input :style="{ width: '350px' }" placeholder="请输入查询内容" search-button />
        </Col>
        <Col :span="4" style="text-align: right">
          <Space>
            <Button type="primary" @click="searchuserlist">
              <template #icon>
                <IconSearch />
              </template>
              搜索
            </Button>
          </Space>
        </Col>

        <Divider direction="horizontal" type="dashed" />
        <!--请求数据列表-->
        <Col>
          <Table id="userTable" row-key="uuid" :data="tableData" @row-click="assignmentpermission">
            <template #columns>
              <TableColumn title="uuid" data-index="uuid" />
              <TableColumn title="主机地址" data-index="host" />
              <TableColumn title="端口号" data-index="port" />
              <TableColumn title="数据库类型" data-index="type" fileterable="">
                <template #cell="{ record }">
                  <Tag v-if="record.type === 1" size="large" color="blue">MySQL</Tag>
                  <Tag v-else-if="record.type === 2" size="large" color="orange">DM</Tag>
                  <Tag v-else size="large" color="cyan">Kingbase</Tag>
                </template>
              </TableColumn>
              <TableColumn title="用户名" data-index="username"> </TableColumn>
              <TableColumn title="修改">
                <template #cell>
                  <Button status="success" @click="reviseuserdata">编辑</Button>
                </template>
              </TableColumn>

              <!--定义删除用户数据操作//ok--点击确认按钮时触发-->
              <TableColumn title="操作">
                <template #cell="{ record }">
                  <Popconfirm
                    content="请确认是否删除此用户数据"
                    @ok="
                      () =>
                        handleDeleteAccount(record.uuid, record.type, record.username, record.host)
                    "
                    type="warning"
                  >
                    <Button status="danger">删除</Button>
                  </Popconfirm>
                </template>
              </TableColumn>

              <TableColumn title="权限" data-index="permissions">
                <template #cell>
                  <Button type="primary" html-type="row-click">分配</Button>
                </template>
              </TableColumn>
            </template>
          </Table>
        </Col>
      </Row>
    </Card>

    <!--修改用户信息-->
    <Modal v-model:visible="visibleChange" :hide-cancel="true">
      <template #title> 修改用户信息 </template>
      <ReviseForm v-if="step === 0" @change-step="changeStep" />
      <Successadd v-else-if="step === 1" @change-step="changeStep" />
    </Modal>

    <!--分配权限-->
    <Modal v-model:visible="visibleAssignment" :hide-cancel="true">
      <template #title>权限授权</template>
      <Permission :typedata="tableData" />
    </Modal>
  </PageContainer>
</template>

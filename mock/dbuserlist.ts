import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';
//关系型数据库用户管理-post请求，响应值为code,msg,data(null
const requests: MockMethod[] = [
  //添加用户
  {
    url: '/api/v1/sql/user/add',
    method: 'post',
    response: () => {
      return successResp();
    },
  },

  //自定义添加-项目中没有
  {
    url: '/api/v1/sql/user/request',
    method: 'get',
    response: () => {
      return successResp({
        data: Array(11)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              host: Random.ip(),
              port: Random.integer(1000, 50000),
              type: Random.pick([1, 2, 3]),
              username: Random.name(),
              permissions: {
                MySQL: Array(14)
                  .fill(1)
                  .map(() => Random.name()),
                DM: Array(6)
                  .fill(1)
                  .map(() => Random.name()),
                KingBase: Array(4)
                  .fill(1)
                  .map(() => Random.name()),
              },
            };
          }),
      });
    },
  },

  //修改用户
  {
    url: '/api/v1/sql/user/update',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  //删除用户
  {
    url: '/api/v1/sql/user/delete',
    method: 'delete',
    response: () => {
      return successResp();
    },
  },
  //授权用户
  {
    url: '/api/v1/sql/user/grant',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  //撤销权限
  {
    url: '/api/v1/sql/user/revoke',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
];

export default requests;

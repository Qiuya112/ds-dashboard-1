import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/table/query',
    method: 'post',
    response: () => {
      return successResp({
        columnList: Array(10)
          .fill(1)
          .map(() => {
            return {
              columnName: Random.string(),
              columnNameType: Random.pick(['int', 'sting']),
            };
          }),
        data: Array(12)
          .fill(1)
          .map(() => {
            return {
              column: Random.string(),
              columnType: Random.pick(['int', 'sting']),
            };
          }),
      });
    },
  },
];

export default requests;

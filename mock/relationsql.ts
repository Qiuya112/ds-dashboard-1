import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/execute/sql',
    method: 'get',
    response: () => {
      return successResp({
        names: Array(15)
          .fill(1)
          .map(() => Random.name()),
        tablenames: Array(15)
        .fill(1)
        .map(() => Random.name()),
        viewnames: Array(15)
        .fill(1)
        .map(() => Random.name()),
      });
    },
  },
];

export default requests;

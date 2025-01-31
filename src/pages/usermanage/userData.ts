//用户信息--uuid应该是随机生成
export interface UserFormlist {
  uuid?: string;
  username?: string;
  host?: string;
  password?: string;
  type: 1 | 2 | 3;
}

export const defaultUserFormlist: Record<number, Omit<UserFormlist, 'type'>> = {
  1: {
    uuid:"",
    username: "",
    host: "",
    password: "",
  },
  2: {
    uuid:"",
    username: "",
    host: "",
    password: "",
  },
  3: {
    uuid:"",
    username: "",
    host: "",
    password: "",
  },
};

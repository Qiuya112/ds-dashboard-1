//连接参数
export interface GetConnectListParams {
  pg: number;
  size: number;
  ip?: string;
  username?: string;
  type?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface GetListDataItem {
  uuid: string;
  username: string;
  ip: string;
  port: number;
  type: number;
}

export interface GetListData {
  count: number;
  data: GetListDataItem[];
}

export interface ChartValue {
  count: number;
  growth: number;
  value: number[];
}

export interface ConcurrentChartValue {
  xAxis: string[];
  concurrent: number[];
  through: number[];
}

//用户列表的参数的接口
export interface UserlistParams {
  uuid: string;
  host: string;
  port:string
  type: 1 | 2 | 3;
  username: string;
  permissions:{
    MySQL:string[];
    DM:string[];
    KingBase:string[];
  }
}
export interface PermissionList{
  MySQL:string[];
  DM:string[];
  KingBase:string[];
}
//响应的数组
export interface UserlistData {
  data: UserlistParams[];
}

export interface InqueryColumList {
  columnName: string,
  columnNameType: string
}
export interface InqueryData{
  column: string,
  columnType: string
}
export interface InqueryParams {
  columnList: InqueryColumList[];
  data:InqueryData[];
}

//数据库列表
export  interface SchemaParams{
  names:string;
}

